import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsResolver } from './requests.resolver';
import { Request } from './entities/request.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request]),
    TypeOrmModule.forFeature([Subscription]),
  ],
  providers: [RequestsResolver, RequestsService, SubscriptionsService],
})
export class RequestsModule {}
