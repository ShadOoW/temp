import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import { Injectable } from '@nestjs/common';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { Request } from '../requests/entities/request.entity';
import { Repository, Not, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RequestCreatedEvent } from './interfaces/request';

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
      from: {
        id: requestEntity.from.id,
        email: requestEntity.from.email,
        username: requestEntity.from.username,
        profile: requestEntity.from.profile,
      },
      to: {
        id: requestEntity.to?.id,
        email: requestEntity.to?.email,
        username: requestEntity.to?.username,
        profile: requestEntity.to?.profile,
      },
      status: requestEntity.status,
      createdAt: requestEntity.createdAt,
    };
  }

  async create(createRequestInput: CreateRequestInput) {
    const { from, to } = createRequestInput;
    try {
      const publicRequest = await this.repo.findOne({
        where: { from, status: 'created' },
      });
      const privateRequest = to
        ? await this.repo.findOne({
            where: { from, to: Not(IsNull()), status: 'created' },
          })
        : null;

      if (publicRequest) {
        if (privateRequest || !to)
          throw new HttpException(
            ERROR_MESSAGES.CANNOT_CREATE,
            HttpStatus.BAD_REQUEST,
          );
      }

      return this.repo
        .save({
          ...createRequestInput,
          title: createRequestInput.whyNeedCoaching,
          excerpt: createRequestInput.message,
          description: createRequestInput.expectations,
        })
        .then((request) => {
          // create Event
          const requestCreatedEvent = new RequestCreatedEvent();
          requestCreatedEvent.name = createRequestInput.whyNeedCoaching;
          requestCreatedEvent.description = createRequestInput.message;
          this.eventEmitter.emit('order.created', requestCreatedEvent);
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
    delete args.skip;
    const [requests, totalCount] = await this.repo.findAndCount({
      where: args,
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
    //TODO show error message
  }
}
