import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventsService } from '../../../events-service/events/events.service';
import { CreateEventInput } from '../../../events-service/events/dto/create-event.input';
import { Request } from '../entities/request.entity';

@Injectable()
export class RequestListener {
  constructor(private eventsService: EventsService) {}
  @OnEvent('request.created')
  async handleRequestCreatedEvent(request: Request) {
    const from = request.proposition ? request.to : request.from;
    const to = request.proposition ? request.from : request.to;
    const requestCreatedEvent = new CreateEventInput(
      'request',
      'created',
      request.id,
      from,
      to,
      {
        name: request.title,
        desciption: request.description,
        status: request.status,
        createdAt: request.createdAt,
      },
    );
    await this.eventsService.create(requestCreatedEvent).then((event) => {
      console.log(event);
    });
  }
}
