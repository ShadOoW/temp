import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { GetEventsArgs } from './dto/get-events.args';
import { GetEvents } from './dto/get-events.dto';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Mutation(() => Event)
  createEvent(@Args('createEventInput') createEventInput: CreateEventInput) {
    return this.eventsService.create(createEventInput);
  }

  @Query(() => GetEvents, { name: 'events' })
  findAll(@Args() args: GetEventsArgs) {
    return this.eventsService.findAll(args);
  }
}
