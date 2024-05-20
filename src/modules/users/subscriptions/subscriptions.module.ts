import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailsService } from '@src/modules/users/emails/emails.service';
import { ProfileEntity } from '@src/modules/users/profiles/entities/profile.entity';
import { ProfilesService } from '@src/modules/users/profiles/profiles.service';
import { UserEntity } from '@users/users/entities/user.entity';
import { UsersService } from '@users/users/users.service';
import { SubscriptionEntity } from './entities/subscription.entity';
import { SubscriptionsResolver } from './subscriptions.resolver';
import { SubscriptionsService } from './subscriptions.service';
import { ChatService } from '@modules/messaging/chat/chat.service';
import { MessageRepository } from '@modules/messaging/chat/message.repository';
import { RoomRepository } from '@modules/messaging/chat/room.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SubscriptionEntity,
      UserEntity,
      ProfileEntity,
      MessageRepository,
      RoomRepository,
    ]),
  ],
  providers: [
    SubscriptionsResolver,
    SubscriptionsService,
    EmailsService,
    UsersService,
    ChatService,
    ProfilesService,
  ],
})
export class SubscriptionsModule {}
