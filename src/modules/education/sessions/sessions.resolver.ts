import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SessionsService } from './sessions.service';
import { UpdateSessionInput } from './dto/update-session.input';
import { CreateSessionInput } from './dto/create-session.input copy';
import { User as CurrentUser } from '@src/decorators/user.decorator';
import { SessionsPageOptionsDto } from './dto/sessions-page-options.dto';
import { SessionsPageDto } from './dto/sessions-page.dto';
import { SessionDto } from './dto/session.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsersService } from '@users/users/users.service';

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
    @CurrentUser() userId,
  ) {
    return this.sessionsService.create(createSessionInput).then((event) => {
      this.eventEmitter.emit('session.created', { ...event, userId });
      return event;
    });
  }

  @Query(() => SessionsPageDto, { name: 'sessions' })
  async findAll(
    @Args('status', { type: () => String, nullable: true }) status: string,
    @Args() pageOptionsDto: SessionsPageOptionsDto,
    @CurrentUser() userId,
  ) {
    const user = await this.usersService.findOne(userId);
    if (user.isAdmin)
      return this.sessionsService.findAll(pageOptionsDto, status);
    else if (user.role?.name === 'mentor')
      return this.sessionsService.findAll(pageOptionsDto, status, userId);
    else
      return this.sessionsService.findAll(
        pageOptionsDto,
        status,
        undefined,
        userId,
      );
  }

  // TODO optimaze
  @Query(() => SessionsPageDto, { name: 'sessionsNotDue' })
  async sessionsNotDue(
    @Args('status', { type: () => String, nullable: true }) status: string,
    @Args() pageOptionsDto: SessionsPageOptionsDto,
    @CurrentUser() userId,
  ) {
    const user = await this.usersService.findOne(userId);
    if (user.isAdmin)
      return this.sessionsService.findNotDue(pageOptionsDto, status);
    else if (user.role?.name === 'mentor')
      return this.sessionsService.findNotDue(pageOptionsDto, status, userId);
    else
      return this.sessionsService.findNotDue(
        pageOptionsDto,
        status,
        undefined,
        userId,
      );
  }

  @Mutation(() => SessionDto, { name: 'updateSession' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
    @CurrentUser() userId,
  ) {
    return this.sessionsService.update(id, updateSessionInput).then((event) => {
      this.eventEmitter.emit('session.updated', { ...event, userId });
      return event;
    });
  }

  @Query(() => [SessionDto], { name: 'activatedSessions' })
  findActivated(@CurrentUser() userId) {
    return this.sessionsService.findActivated(userId);
  }

  @Query(() => SessionDto, { name: 'session' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sessionsService.findOne(id);
  }

  @Mutation(() => SessionDto)
  removeSession(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() userId,
  ) {
    return this.sessionsService.remove(id).then((event) => {
      this.eventEmitter.emit('session.deleted', { ...event, userId });
      return event;
    });
  }
}
