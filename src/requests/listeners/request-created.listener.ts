import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RequestCreatedEvent } from '../interfaces/request';

@Injectable()
export class RequestCreatedListener {
  @OnEvent('order.created')
  handleOrderCreatedEvent(event: RequestCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
    console.log(event);
  }
}
