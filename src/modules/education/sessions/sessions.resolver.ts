import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SessionsService } from './sessions.service';
import { UpdateSessionInput } from './dto/update-session.input';
import { CreateSessionInput } from './dto/create-session.input';
import { User as CurrentUser } from '@src/decorators/user.decorator';
import { SessionsPageOptionsDto } from './dto/sessions-page-options.dto';
import { SessionsPageDto } from './dto/sessions-page.dto';
import { SessionDto } from './dto/session.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsersService } from '@users/users/users.service';
import { SessionsCalcsDto } from './dto/sessions-calcs.dto';

@Resolver(() => SessionDto)
export class SessionsResolver {
  constructor(
    private readonly sessionsService: SessionsService,
    private eventEmitter: EventEmitter2,
    private usersService: UsersService,
  ) {}

  @Mutation(() => SessionDto)
  createSession(
    @Args('createSessionInput') createSessionInput: CreateSessionInput,
    @CurrentUser() user,
  ) {
    return this.sessionsService.create(createSessionInput).then((event) => {
      this.eventEmitter.emit('session.created', { ...event, userId: user.id });
      return event;
    });
  }

  @Query(() => SessionsPageDto, { name: 'sessionsM2m' })
  async sessionM2m(
    @Args('status', { type: () => String, nullable: true }) status: string,
    @Args() pageOptionsDto: SessionsPageOptionsDto,
    @Args('mentor', { type: () => String, nullable: true }) mentor: string,
    @Args('mentee', { type: () => String, nullable: true }) mentee: string,
  ) {
    return this.sessionsService.findAll(pageOptionsDto, status, mentor, mentee);
  }

  @Query(() => SessionsPageDto, { name: 'sessions' })
  async findAll(
    @Args('status', { type: () => String, nullable: true }) status: string,
    @Args() pageOptionsDto: SessionsPageOptionsDto,
    @CurrentUser() user,
  ) {
    if (user.isAdmin)
      return this.sessionsService.findAll(pageOptionsDto, status);
    else if (user.role?.name === 'mentor')
      return this.sessionsService.findAll(pageOptionsDto, status, user.id);
    else
      return this.sessionsService.findAll(
        pageOptionsDto,
        status,
        undefined,
        user.id,
      );
  }

  // TODO optimize
  @Query(() => SessionsPageDto, { name: 'sessionsNotDue' })
  async sessionsNotDue(
    @Args('status', { type: () => String, nullable: true }) status: string,
    @Args() pageOptionsDto: SessionsPageOptionsDto,
    @CurrentUser() user,
  ) {
    if (user.isAdmin)
      return this.sessionsService.findNotDue(pageOptionsDto, status);
    else if (user.role?.name === 'mentor')
      return this.sessionsService.findNotDue(pageOptionsDto, status, user.id);
    else
      return this.sessionsService.findNotDue(
        pageOptionsDto,
        status,
        undefined,
        user.id,
      );
  }

  @Mutation(() => SessionDto, { name: 'updateSession' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
    @CurrentUser() user,
  ) {
    return this.sessionsService.update(id, updateSessionInput).then((event) => {
      this.eventEmitter.emit('session.updated', { ...event, userId: user.id });
      return event;
    });
  }

  @Query(() => SessionsCalcsDto, { name: 'sessionCalcs' })
  sessionCalcs(@Args('id', { type: () => String }) userId) {
    return this.sessionsService.sessionCalcs(userId);
  }

  @Query(() => [SessionDto], { name: 'activatedSessions' })
  findActivated(@CurrentUser() user) {
    return this.sessionsService.findActivated(user.id);
  }

  @Query(() => SessionDto, { name: 'upcomingSession' })
  upcomingSession(
    @Args('mentor', { type: () => String }) mentor: string,
    @Args('mentee', { type: () => String }) mentee: string,
  ) {
    return this.sessionsService.upcomingSession(mentor, mentee);
  }

  @Query(() => SessionDto, { name: 'session' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sessionsService.findOne(id);
  }

  @Mutation(() => SessionDto)
  removeSession(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() user,
  ) {
    return this.sessionsService.remove(id).then((event) => {
      this.eventEmitter.emit('session.deleted', { ...event, userId: user.id });
      return event;
    });
  }
}
