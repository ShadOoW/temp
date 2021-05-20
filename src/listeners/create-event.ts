import { Inject, Injectable } from '@nestjs/common';
import { SessionDto } from '@education/sessions/dto/session.dto';
import { CreateEventInput } from '@src/modules/events/events/dto/create-event.input';
import { EventsService } from '@src/modules/events/events/events.service';
// import { RequestDto } from '@users/requests/dto/request.dto';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class CreateEvents {
  constructor(
    private eventsService: EventsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  async request(request, command: string) {
    let from = request.mentee.id;
    let to = request.mentor.id;
    console.log('======>', request);
    if (request.userId === request.mentor.id) {
      from = request.mentor.id;
      to = request.mentee.id;
    }
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
        proposition: request.proposition,
        createdAt: request.createdAt,
      },
    );
    return await this.eventsService
      .create(requestCreatedEvent)
      .then((event) => {
        this.pubSub.publish('notification', { notification: event });
        this.pubSub.publish('activity', { activity: event });
      });
  }

  async session(session, command: string) {
    let from = session.mentee;
    let to = session.mentor;
    if (session.userId === session.mentor.id) {
      from = session.mentor;
      to = session.mentee;
    }
    const sessionCreatedEvent = new CreateEventInput(
      'session',
      command,
      session.id,
      from,
      to,
      {
        name: session.title,
        desciption: session.description,
        status: session.status,
        isFromMentor: session.isFromMentor,
        startDate: session.startDate,
        isVideoCall: session.isVideoCall,
        createdAt: session.createdAt,
      },
    );
    return await this.eventsService
      .create(sessionCreatedEvent)
      .then((event) => {
        this.pubSub.publish('notification', { notification: event });
        this.pubSub.publish('activity', { activity: event });
      });
  }

  async message(message, command: string) {
    const from = message.sender;
    const to = message.receiver;
    const messageCreatedEvent = new CreateEventInput(
      'message',
      command,
      message.id,
      from,
      to,
      {
        createdAt: message.createdAt,
      },
    );
    return await this.eventsService
      .create(messageCreatedEvent)
      .then((event) => {
        this.pubSub.publish('notification', { notification: event });
        this.pubSub.publish('activity', { activity: event });
      });
  }
}
