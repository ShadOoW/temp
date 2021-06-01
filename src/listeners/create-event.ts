import { Inject, Injectable } from '@nestjs/common';
// import { SessionDto } from '@education/sessions/dto/session.dto';
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
    const { mentee, mentor } = request;
    if (mentee && mentor) {
      let from = request.mentee.id;
      let to = request.mentor.id;
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
        .then(async (event) => {
          const createdEvent = await this.eventsService.findOne(event.id);
          this.pubSub.publish('notification', { notification: createdEvent });
          this.pubSub.publish('activity', { activity: createdEvent });
        });
    }
  }

  async session(session, command: string) {
    const { mentee, mentor } = session;
    if (mentee && mentor) {
      let from = session.mentee.id;
      let to = session.mentor.id;
      if (session.userId === session.mentor.id) {
        from = session.mentor.id;
        to = session.mentee.id;
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
        .then(async (event) => {
          const createdEvent = await this.eventsService.findOne(event.id);
          this.pubSub.publish('notification', { notification: createdEvent });
          this.pubSub.publish('activity', { activity: createdEvent });
        });
    }
  }

  async message(message, command: string) {
    const { sender, receiver } = message;
    if (sender && receiver) {
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
        .then(async (event) => {
          const createdEvent = await this.eventsService.findOne(event.id);
          this.pubSub.publish('messageNotification', {
            messageNotification: createdEvent,
          });
          // this.pubSub.publish('activity', { activity: createdEvent });
        });
    }
  }

  async quiz(quiz, command: string) {
    const { mentor, mentees } = quiz;
    if (mentor && mentees) {
      const from = quiz.mentor.id;
      // const to = quiz.mentee;
      const eventsPromises = mentees.map(async (mentee) => {
        const to = mentee.id;
        const quizCreatedEvent = new CreateEventInput(
          'quiz',
          command,
          quiz.id,
          from,
          to,
          {
            name: quiz.title,
            createdAt: quiz.createdAt,
          },
        );
        return await this.eventsService
          .create(quizCreatedEvent)
          .then(async (event) => {
            const createdEvent = await this.eventsService.findOne(event.id);
            this.pubSub.publish('notification', { notification: createdEvent });
            this.pubSub.publish('activity', { activity: createdEvent });
          });
      });

      return await Promise.all(eventsPromises);
    }
  }

  async quizSolution(quizSolution, command: string) {
    const { mentor } = quizSolution;
    if (mentor) {
      const from = quizSolution.userId;
      const to = quizSolution.mentor.id;
      const sessionCreatedEvent = new CreateEventInput(
        'quizSolution',
        command,
        quizSolution.id,
        from,
        to,
        {
          name: quizSolution.title,
          createdAt: quizSolution.createdAt,
        },
      );
      return await this.eventsService
        .create(sessionCreatedEvent)
        .then(async (event) => {
          const createdEvent = await this.eventsService.findOne(event.id);
          this.pubSub.publish('notification', { notification: createdEvent });
          this.pubSub.publish('activity', { activity: createdEvent });
        });
    }
  }
}
