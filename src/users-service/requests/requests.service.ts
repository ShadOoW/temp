import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../../shared/ERROR_MESSAGES';
import { Injectable } from '@nestjs/common';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { Request } from './entities/request.entity';
import { Repository, Not, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UtilsService } from '../../shared/providers/utils.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request) private readonly repo: Repository<Request>,
    private subscriptionService: SubscriptionsService,
    private eventEmitter: EventEmitter2,
  ) {}

  getRequest(requestEntity: Request): any {
    return {
      id: requestEntity.id,
      whyNeedCoaching: requestEntity.title,
      expectations: requestEntity.description,
      message: requestEntity.excerpt,
      proposition: requestEntity.proposition,
      mentee: {
        id: requestEntity.from?.id,
        email: requestEntity.from?.email,
        username: requestEntity.from?.username,
        profile: requestEntity.from?.profile,
      },
      mentor: {
        id: requestEntity.to?.id,
        email: requestEntity.to?.email,
        username: requestEntity.to?.username,
        profile: requestEntity.to?.profile,
      },
      status: requestEntity.status,
      createdAt: requestEntity.createdAt,
    };
  }

  async canRequest(mentee: string) {
    return (
      (await this.repo.count({
        where: { from: mentee, status: Not('refused') },
      })) == 0
    );
  }

  async create(createRequestInput: CreateRequestInput) {
    const { mentee, mentor, proposition } = createRequestInput;
    try {
      const publicRequest = await this.repo.findOne({
        where: { from: mentee, to: null, status: 'created' },
      });
      const privateRequest = await this.repo.findOne({
        where: { from: mentee, to: Not(IsNull()), status: 'created' },
      });
      const m2mRequest = mentor
        ? await this.repo.findOne({
            where: { from: mentee, to: mentor, status: 'created' },
          })
        : null;

      if (
        m2mRequest ||
        (!proposition && publicRequest && !mentor) ||
        (!proposition && publicRequest && privateRequest)
      ) {
        throw new HttpException(
          ERROR_MESSAGES.CANNOT_CREATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return this.repo
        .save({
          ...createRequestInput,
          from: createRequestInput.mentee,
          to: createRequestInput.mentor,
          title: createRequestInput.whyNeedCoaching,
          excerpt: createRequestInput.message,
          description: createRequestInput.expectations,
        })
        .then((request) => {
          // this.eventEmitter.emit('request.created', request);
          return this.getRequest(request);
        });
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGES.CANNOT_CREATE,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(args = null) {
    const { take, skip } = args;
    delete args.take;
    delete args.mentee;
    delete args.mentor;
    delete args.skip;
    const [requests, totalCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions(args),
      relations: [
        'to',
        'from',
        'to.profile',
        'to.profile.coachingDomains',
        'from.profile',
        'from.profile.wantedDomain',
      ],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take,
    });
    return {
      requests: requests.map((req) => this.getRequest(req)),
      totalCount,
    };
  }

  async findOne(id: string) {
    return await this.repo
      .findOne(id, {
        relations: [
          'to',
          'from',
          'to.profile',
          'to.profile.coachingDomains',
          'from.profile',
          'from.profile.wantedDomain',
        ],
      })
      .then((request) => this.getRequest(request));
  }

  async update(id: string, updateRequestInput: UpdateRequestInput) {
    const { status } = updateRequestInput;
    const request = await this.repo.findOne(id, { relations: ['to', 'from'] });
    if (!request) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (request.status === 'accepted' || request.status === 'refused') {
      throw new HttpException(
        ERROR_MESSAGES.CANNOT_UPDATE,
        HttpStatus.NOT_MODIFIED,
      );
    }
    const updatedRequest = await this.repo.save({
      id,
      ...updateRequestInput,
      from: updateRequestInput.mentee,
      to: updateRequestInput.mentor,
      title: updateRequestInput.whyNeedCoaching,
      excerpt: updateRequestInput.message,
      description: updateRequestInput.expectations,
    });

    if (status == 'accepted') {
      this.subscriptionService.create({
        subscriber: request.from,
        subscribedTo: request.to,
      });
    }

    return updatedRequest;
  }

  async remove(id: string) {
    const requestToDelete = await this.repo.findOne(id);
    if (requestToDelete) {
      await this.repo.delete(id);
      return requestToDelete;
    }
  }
}
