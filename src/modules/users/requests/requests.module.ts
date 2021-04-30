import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsResolver } from './requests.resolver';
import { RequestEntity } from './entities/request.entity';
import { SubscriptionEntity } from '@users/subscriptions/entities/subscription.entity';
import { SubscriptionsService } from '@users/subscriptions/subscriptions.service';
import { CaslModule } from '@users/casl/casl.module';
import { RequestListener } from './listeners/request.listener';
import { EventsService } from '@src/modules/events/events/events.service';
import { Event } from '@src/modules/events/events/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity, SubscriptionEntity, Event]),
    CaslModule,
  ],
  providers: [
    RequestsResolver,
    RequestsService,
    SubscriptionsService,
    RequestListener,
    EventsService,
  ],
})
export class RequestsModule {}
