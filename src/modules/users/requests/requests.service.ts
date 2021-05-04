import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { Injectable } from '@nestjs/common';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { RequestEntity } from './entities/request.entity';
import { Repository, Not, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionsService } from '@users/subscriptions/subscriptions.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RequestDto } from './dto/request.dto';
import { RequestsPageOptionsDto } from './dto/requests-page-options.dto';
import { RequestsPageDto } from './dto/requests-page.dto';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly repo: Repository<RequestEntity>,
    private subscriptionService: SubscriptionsService,
    private eventEmitter: EventEmitter2,
  ) {}

  async canRequest(mentee: string): Promise<boolean> {
    return (
      (await this.repo.count({
        where: { from: mentee, status: Not('refused') },
      })) == 0
    );
  }

  async create(createRequestInput: CreateRequestInput): Promise<RequestDto> {
    const {
      mentee,
      mentor,
      proposition,
      whyNeedCoaching,
      message,
      expectations,
    } = createRequestInput;
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

      const createdRequest = await this.repo.create({
        from: mentee,
        to: mentor,
        title: whyNeedCoaching,
        description: expectations,
        excerpt: message,
        proposition,
      });
      return (await this.repo.save(createdRequest)).toDto();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        ERROR_MESSAGES.CANNOT_CREATE,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // TODO add skip order page ...
  async findAll(
    pageOptionsDto: RequestsPageOptionsDto,
  ): Promise<RequestsPageDto> {
    const { mentee: from, mentor: to } = pageOptionsDto;
    delete pageOptionsDto.mentee;
    delete pageOptionsDto.mentor;
    const [requests, requestsCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions({
        ...pageOptionsDto,
        from,
        to,
      }),
      relations: [
        'to',
        'from',
        'to.profile',
        'to.profile.coachingDomains',
        'from.profile',
        'from.profile.wantedDomain',
      ],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: requestsCount,
    });
    return new RequestsPageDto(requests.toDtos(), pageMetaDto);
  }

  async findOne(id: string) {
    const request = await this.repo.findOneOrFail(id, {
      relations: [
        'to',
        'from',
        'to.profile',
        'to.profile.coachingDomains',
        'from.profile',
        'from.profile.wantedDomain',
      ],
    });
    return request ? request.toDto() : null;
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
    const createdRequest = await this.repo.create({
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
    return (await this.repo.save(createdRequest)).toDto();
  }

  async remove(id: string) {
    const requestToDelete = await this.repo.findOne(id);
    if (requestToDelete) {
      await this.repo.delete(id);
      return requestToDelete.toDto();
    }
  }
}
