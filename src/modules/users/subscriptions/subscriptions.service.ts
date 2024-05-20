import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SUBSCRIBER_MENTOR_TEMPLATE,
  SUBSCRIBER_MENTOR_SUBJECT,
  SUBSCRIBER_MENTEE_TEMPLATE,
  SUBSCRIBER_MENTEE_SUBJECT,
  ADMIN_USUBSCRIBE_SUBJECT,
  ADMIN_USUBSCRIBE_TEMPLATE,
  UNSUBSCRIBE_TO_SUBJECT,
  UNSUBSCRIBE_TO_TEMPLATE,
} from '@shared/emails';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { PageOptionsDto } from '@src/common/dto/page-options.dto';
import { UtilsService } from '@src/providers/utils.service';
import { EmailsService } from '@users/emails/emails.service';
import { IsNull, Not, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CreateSubscriptionInput } from './dto/create-subscription.input';
import { SubscriptionsPageOptionsDto } from './dto/subscriptions-page-options.dto';
import { SubscriptionsPageDto } from './dto/subscriptions-page.dto';
import { SubscriptionEntity } from './entities/subscription.entity';
import { ChatService } from '@modules/messaging/chat/chat.service';
import { MENTOR_MENTEE_WELCOME } from '@shared/chat';
import { UserEntity } from '@users/users/entities/user.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly repo: Repository<SubscriptionEntity>,
    private emailService: EmailsService,
    private chatService: ChatService,
    private usersService: UsersService,
  ) {}

  async create(createSubscriptionInput: CreateSubscriptionInput) {
    const createdSubscription = await this.repo.create(createSubscriptionInput);
    const { subscriber, subscribedTo } = createSubscriptionInput;
    await this.sendSubscriptionEmail(subscriber.id, subscribedTo.id);
    await this.sendSubscriptionMessage(subscriber, subscribedTo);
    return (await this.repo.save(createdSubscription)).toDto();
  }

  async findSubscribers(pageOptionsDto: SubscriptionsPageOptionsDto) {
    const [subscribers, subscribersCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions({
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

  async findDeletedSubscriptions(pageOptionsDto: PageOptionsDto) {
    const [subscriptions, subscriptionsCount] = await this.repo.findAndCount({
      where: { deletedAt: Not(IsNull()) },
      relations: [
        'subscribedTo',
        'subscribedTo.profile',
        'subscriber',
        'subscriber.profile',
      ],
      withDeleted: true,
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: subscriptionsCount,
    });
    return new SubscriptionsPageDto(subscriptions.toDtos(), pageMetaDto);
  }

  async findSubscriptions(pageOptionsDto: SubscriptionsPageOptionsDto) {
    const [subscriptions, subscriptionsCount] = await this.repo.findAndCount({
      where: UtilsService.getOptions({ subscriber: pageOptionsDto.id }),
      relations: ['subscribedTo', 'subscribedTo.profile'],
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: subscriptionsCount,
    });
    return new SubscriptionsPageDto(subscriptions.toDtos(), pageMetaDto);
  }

  async usersCount(id) {
    return await this.repo.count({
      where: { subscribedTo: id },
    });
  }

  async remove(id: string, role: string) {
    const subscriptionToDelete = await this.repo.findOne(id, {
      relations: [
        'subscriber',
        'subscribedTo',
        'subscribedTo.profile',
        'subscriber.profile',
      ],
    });
    if (subscriptionToDelete) {
      if (role == 'mentee') {
        await this.sendEmailToUnsubscribed(
          subscriptionToDelete.subscribedTo.id,
        );
      } else if (role == 'mentor') {
        await this.sendEmailToUnsubscribed(subscriptionToDelete.subscriber.id);
      }
      await this.repo.softDelete(id);
      await this.emailService.sendMail(
        ADMIN_USUBSCRIBE_TEMPLATE,
        process.env.ADMIN_EMAIL,
        ADMIN_USUBSCRIBE_SUBJECT,
        {},
      );
      return subscriptionToDelete;
    }
  }

  async sendSubscriptionEmail(subscriberId: string, subscribedToId: string) {
    const subscriber = await this.usersService.findOne(subscriberId);
    const subscribedTo = await this.usersService.findOne(subscribedToId);
    if (!subscriber || !subscribedTo) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (subscriber && subscribedTo) {
      await this.emailService.sendMail(
        SUBSCRIBER_MENTEE_TEMPLATE,
        subscriber.email,
        SUBSCRIBER_MENTEE_SUBJECT,
        {
          firstName: subscriber.profile?.firstName,
          lastName: subscriber.profile?.lastName,
          fromFirstName: subscribedTo.profile?.firstName,
          fromLastName: subscribedTo.profile?.lastName,
        },
      );
      await this.emailService.sendMail(
        SUBSCRIBER_MENTOR_TEMPLATE,
        subscribedTo.email,
        SUBSCRIBER_MENTOR_SUBJECT,
        {
          firstName: subscribedTo.profile?.firstName,
          lastName: subscribedTo.profile?.lastName,
          fromFirstName: subscriber.profile?.firstName,
          fromLastName: subscriber.profile?.lastName,
        },
      );
    }
  }
  async sendEmailToUnsubscribed(Id: any) {
    const user = await this.usersService.findOne(Id);
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.emailService.sendMail(
      UNSUBSCRIBE_TO_TEMPLATE,
      user?.email,
      UNSUBSCRIBE_TO_SUBJECT,
      {
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
      },
    );
  }

  async sendSubscriptionMessage(
    subscriber: UserEntity,
    subscribedTo: UserEntity,
  ) {
    const subscriberDto = await this.usersService.findOne(subscriber.id);
    const subscribedToDto = await this.usersService.findOne(subscribedTo.id);
    if (!subscriberDto || !subscribedToDto) {
      console.log('HTTP EXCEPTION');
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (subscriber && subscribedTo) {
      await this.chatService.createPrivateMessage(
        subscribedTo,
        subscriberDto,
        MENTOR_MENTEE_WELCOME,
      );
    }
  }
}
