import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SubscriptionsPageOptionsDto } from './dto/subscriptions-page-options.dto';
import { SubscriptionsPageDto } from './dto/subscriptions-page.dto';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UtilsService } from '@src/providers/utils.service';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly repo: Repository<SubscriptionEntity>,
  ) {}

  async create(createSubscriptionInput: CreateSubscriptionInput) {
    const createdSubscription = await this.repo.create(createSubscriptionInput);
    return (await this.repo.save(createdSubscription)).toDto();
  }

  async findSubscribers(pageOptionsDto: SubscriptionsPageOptionsDto) {
    const [subscribers, subscribersCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions({
        ...pageOptionsDto,
        subscribedTo: pageOptionsDto.id,
      }),
      relations: ['subscriber', 'subscriber.profile'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: subscribersCount,
    });
    return new SubscriptionsPageDto(subscribers.toDtos(), pageMetaDto);
  }

  async findSubscriptions(pageOptionsDto: SubscriptionsPageOptionsDto) {
    const [subscriptions, subscriptionsCount] = await this.repo.findAndCount({
      where: { subscriber: pageOptionsDto.id },

      relations: ['subscribedTo', 'subscribedTo.profile'],
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: subscriptionsCount,
    });
    return new SubscriptionsPageDto(subscriptions.toDtos(), pageMetaDto);
  }
}
