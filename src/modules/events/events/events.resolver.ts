/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { CreateEventInput } from './dto/create-event.input';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { UpdateEventInput } from './dto/update-event.input';
import { EventDto } from './dto/event.dto';
import { EventsPageDto } from './dto/events-page.dto';
import { EventsPageOptionsDto } from './dto/events-page-options.dto';
import { User as CurrentUser } from '@src/decorators/user.decorator';

@Resolver(() => EventDto)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Mutation(() => EventDto)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Mutation(() => EventDto)
  updateEvent(
    @Args('id', { type: () => String }) id: string,
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ) {
    return this.eventsService.update(id, updateEventInput);
  }

  @Query(() => EventsPageDto, { name: 'activities' })
  activities(@Args() args: EventsPageOptionsDto, @CurrentUser() user) {
    return this.eventsService.findAll({
      ...args,
      from: user.id,
      module: ['session', 'request', 'quiz', 'quizSolution'],
    });
  }

  @Query(() => EventsPageDto, { name: 'activitiesM2m' })
  activitiesM2m(@Args() args: EventsPageOptionsDto) {
    return this.eventsService.findM2mActivities({
      ...args,
      // module: ['session', 'request'],
    });
  }

  @Query(() => EventsPageDto, { name: 'notifications' })
  notifications(@Args() args: EventsPageOptionsDto, @CurrentUser() user) {
    return this.eventsService.findAll({
      ...args,
      to: user.id,
      module: ['session', 'request', 'quiz', 'quizSolution'],
    });
  }

  @Query(() => EventsPageDto, { name: 'messagesNotifications' })
  messagesNotifications(
    @Args() args: EventsPageOptionsDto,
    @CurrentUser() user,
  ) {
    return this.eventsService.findAll({
      ...args,
      to: user.id,
      module: ['message'],
    });
  }

  @Mutation(() => Boolean)
  messagesAsRead(@CurrentUser() user) {
    return this.eventsService.updateAllMessages(user.id);
  }

  @Query(() => EventsPageDto, { name: 'events' })
  findAll(@Args() args: EventsPageOptionsDto) {
    return this.eventsService.findAll(args);
  }

  @Subscription(() => EventDto, {
    filter: (payload, variables) => payload.notification.to.id === variables.id,
  })
  notification(@Args('id') id: string) {
    return this.pubSub.asyncIterator('notification');
  }

  @Subscription(() => EventDto, {
    filter: (payload, variables) =>
      payload.messageNotification.to.id === variables.id,
  })
  messageNotification(@Args('id') id: string) {
    return this.pubSub.asyncIterator('messageNotification');
  }

  @Subscription(() => EventDto, {
    filter: (payload, variables) => {
      return payload.activity.from.id === variables.id;
    },
  })
  activity(@Args('id') id: string) {
    return this.pubSub.asyncIterator('activity');
  }
}
