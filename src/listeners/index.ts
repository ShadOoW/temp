import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RequestDto } from '@users/requests/dto/request.dto';
import { PubSub } from 'graphql-subscriptions';
import { CreateEvents } from './create-event';

@Injectable()
export class RequestListener {
  constructor(
    private createEvent: CreateEvents,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}
  @OnEvent('request.created')
  async handleRequestCreatedEvent(request: RequestDto) {
    await this.createEvent.request(request, 'created');
  }

  @OnEvent('request.updated')
  async handleRequestUpdatedEvent(request: RequestDto) {
    await this.createEvent.request(request, 'updated');
  }
}
