import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { Injectable } from '@nestjs/common';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';
import { RequestEntity } from './entities/request.entity';
import { Repository, Not, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionsService } from '@users/subscriptions/subscriptions.service';
import { RequestDto } from './dto/request.dto';
import { RequestsPageOptionsDto } from './dto/requests-page-options.dto';
import { RequestsPageDto } from './dto/requests-page.dto';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(RequestEntity)
    private readonly repo: Repository<RequestEntity>,
    private subscriptionService: SubscriptionsService,
    private usersService: UsersService,
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
      const savedRequest = await this.repo.save(createdRequest);
      return this.findOne(savedRequest.id);
    } catch (error) {
      throw new HttpException(
        ERROR_MESSAGES.CANNOT_CREATE,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async suggestPublicRequests(
    pageOptionsDto: RequestsPageOptionsDto,
    userId: string,
  ): Promise<RequestsPageDto> {
    const mentor = await this.usersService.findOne(userId);
    if (mentor && mentor.profile.coachingDomains.length > 0) {
      const mentorDomains = mentor.profile.coachingDomains.map((d) => d.id);
      const [requests, requestsCount] = await this.repo
        .createQueryBuilder('requests')
        .innerJoinAndSelect('requests.from', 'from')
        .innerJoinAndSelect('from.profile', 'profile')
        .innerJoinAndSelect('profile.wantedDomain', 'wantedDomain')
        .where('wantedDomain.id IN (:...mentorDomains)', { mentorDomains })
        .andWhere('requests.to is null')
        .skip(pageOptionsDto.take * (pageOptionsDto.page - 1))
        .take(pageOptionsDto.take)
        .getManyAndCount();

      const pageMetaDto = new PageMetaDto({
        pageOptionsDto,
        itemCount: requestsCount,
      });
      return new RequestsPageDto(requests.toDtos(), pageMetaDto);
    }
  }

  async findPublicRequestsByDomain(
    pageOptionsDto: RequestsPageOptionsDto,
    domainId: string,
  ): Promise<RequestsPageDto> {
    const [requests, requestsCount] = await this.repo
      .createQueryBuilder('requests')
      .innerJoinAndSelect('requests.from', 'from')
      .innerJoinAndSelect('from.profile', 'profile')
      .innerJoinAndSelect('profile.wantedDomain', 'wantedDomain')
      .where('wantedDomain.id = :domainId', { domainId })
      .andWhere('requests.to is null')
      .skip(pageOptionsDto.take * (pageOptionsDto.page - 1))
      .take(pageOptionsDto.take)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: requestsCount,
    });
    return new RequestsPageDto(requests.toDtos(), pageMetaDto);
  }

  async findPublicRequests(pageOptionsDto): Promise<RequestsPageDto> {
    const { mentee: from } = pageOptionsDto;
    delete pageOptionsDto.mentee;
    const condition = {
      ...UtilsService.getOptions({
        ...pageOptionsDto,
        from,
        status: 'created',
        proposition: false,
      }),
      to: null,
    };
    return this.findAll(condition, pageOptionsDto);
  }

  async getRequests(pageOptionsDto): Promise<RequestsPageDto> {
    const { mentee: from, mentor: to } = pageOptionsDto;
    delete pageOptionsDto.mentee;
    delete pageOptionsDto.mentor;
    const condition = {
      ...UtilsService.getOptions({
        ...pageOptionsDto,
        from,
        to,
      }),
    };
    return this.findAll(condition, pageOptionsDto);
  }

  // TODO add skip order page ...
  async findAll(
    condition,
    pageOptionsDto: RequestsPageOptionsDto,
  ): Promise<RequestsPageDto> {
    const [requests, requestsCount] = await this.repo.findAndCount({
      where: condition,
      relations: [
        'to',
        'from',
        'to.profile',
        'to.profile.coachingDomains',
        'to.profile.domainExpertise',
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
        'to.role',
        'from',
        'from.role',
        'to.profile',
        'to.profile.coachingDomains',
        'to.profile.domainExpertise',
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
    await this.repo.save(createdRequest);
    return this.findOne(id);
  }

  async remove(id: string) {
    const requestToDelete = await this.findOne(id);
    if (requestToDelete) {
      await this.repo.delete(id);
      return requestToDelete;
    }
  }
}
