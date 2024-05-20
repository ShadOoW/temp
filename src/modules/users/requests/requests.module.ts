import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsResolver } from './requests.resolver';
import { RequestEntity } from './entities/request.entity';
import { SubscriptionEntity } from '@users/subscriptions/entities/subscription.entity';
import { SubscriptionsService } from '@users/subscriptions/subscriptions.service';
import { CaslModule } from '@users/casl/casl.module';
import { Listeners } from '@src/listeners';
import { EventsService } from '@src/modules/events/events/events.service';
import { EventEntity } from '@src/modules/events/events/entities/event.entity';
import { CreateEvents } from '@src/listeners/create-event';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { ProfileEntity } from '../profiles/entities/profile.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { EmailsService } from '../emails/emails.service';
import { ChatService } from '@modules/messaging/chat/chat.service';
import { MessageRepository } from '@modules/messaging/chat/message.repository';
import { RoomRepository } from '@modules/messaging/chat/room.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RequestEntity,
      SubscriptionEntity,
      EventEntity,
      UserEntity,
      ProfileEntity,
    ]),
    CaslModule,
  ],
  providers: [
    UsersService,
    RequestsResolver,
    RequestsService,
    ChatService,
    MessageRepository,
    RoomRepository,
    SubscriptionsService,
    Listeners,
    EventsService,
    CreateEvents,
    ProfilesService,
    EmailsService,
  ],
})
export class RequestsModule {}
