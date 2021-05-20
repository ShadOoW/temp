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

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity, SubscriptionEntity, EventEntity]),
    CaslModule,
  ],
  providers: [
    RequestsResolver,
    RequestsService,
    SubscriptionsService,
    Listeners,
    EventsService,
    CreateEvents,
  ],
})
export class RequestsModule {}
