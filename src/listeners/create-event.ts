import { Inject, Injectable } from '@nestjs/common';
import { CreateEventInput } from '@src/modules/events/events/dto/create-event.input';
import { EventsService } from '@src/modules/events/events/events.service';
import { RequestDto } from '@users/requests/dto/request.dto';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CreateEvents {
  constructor(
    private eventsService: EventsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  async request(request: RequestDto, command: string) {
    const from = request.proposition ? request.mentee : request.mentor;
    const to = request.proposition ? request.mentor : request.mentee;
    const requestCreatedEvent = new CreateEventInput(
      'request',
      command,
      request.id,
      from,
      to,
      {
        name: request.whyNeedCoaching,
        desciption: request.expectations,
        status: request.status,
        createdAt: request.createdAt,
      },
    );
    console.log(request, command);
    return await this.eventsService
      .create(requestCreatedEvent)
      .then((event) => {
        this.pubSub.publish('notification', { notification: event });
        this.pubSub.publish('activity', { activity: event });
      });
  }
}
