import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { GetEventsArgs } from './dto/get-events.args';
import { GetEvents } from './dto/get-events.dto';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { UpdateEventInput } from './dto/update-event.input';

@Resolver(() => Event)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Mutation(() => Event)
  updateEvent(
    @Args('id', { type: () => String }) id: string,
    @Args('updateEventInput') updateEventInput: UpdateEventInput,
  ) {
    return this.eventsService.update(id, updateEventInput);
  }

  @Query(() => GetEvents, { name: 'notifications' })
  activities(
    @Args('id', { type: () => String }) id: string,
    @Args() args: GetEventsArgs,
  ) {
    return this.eventsService.findAll({ ...args, from: id });
  }

  @Query(() => GetEvents, { name: 'notifications' })
  notifications(
    @Args('id', { type: () => String }) id: string,
    @Args() args: GetEventsArgs,
  ) {
    return this.eventsService.findAll({ ...args, to: id });
  }

  @Query(() => GetEvents, { name: 'events' })
  findAll(@Args() args: GetEventsArgs) {
    return this.eventsService.findAll(args);
  }

  @Subscription(() => Event)
  notification() {
    return this.pubSub.asyncIterator('notification');
  }

  @Subscription(() => Event)
  activity() {
    return this.pubSub.asyncIterator('activity');
  }
}
