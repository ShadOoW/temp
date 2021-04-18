import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsResolver } from './requests.resolver';
import { Request } from './entities/request.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { CaslModule } from '../casl/casl.module';
import { RequestListener } from './listeners/request.listener';
import { EventsService } from '../events/events.service';
import { Event } from '../events/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request, Subscription, Event]),
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
