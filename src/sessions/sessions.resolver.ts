import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { SessionsService } from './sessions.service';
import { Session } from './entities/session.entity';
import { UpdateSessionInput } from './dto/update-session.input';
import { GetSessionsArgs } from './dto/get-sessions.args';
import { GetSessions } from './dto/get-sessions.dto';
import { PaginationArgs } from '../shared/pagination.args';
import { CreateSessionInput } from './dto/create-session.input copy';
import { User as CurrentUser } from '../users/decorators/user.decorator';

@Resolver(() => Session)
export class SessionsResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @Mutation(() => Session)
  createSession(
    @Args('createSessionInput') createSessionInput: CreateSessionInput,
  ) {
    return this.sessionsService.create(createSessionInput);
  }

  @Query(() => GetSessions, { name: 'sessions' })
  findAll(@Args() getSessionsArgs: GetSessionsArgs) {
    return this.sessionsService.findAll(getSessionsArgs);
  }

  @Query(() => GetSessions, { name: 'menteeSessions' })
  menteeSessions(
    @Args('mentee', { type: () => String }) mentee: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.sessionsService.findAll({ ...paginationArgs, mentee });
  }

  @Query(() => GetSessions, { name: 'mentorSessions' })
  mentorSessions(
    @Args('mentor', { type: () => String }) mentor: string,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.sessionsService.findAll({ ...paginationArgs, mentor });
  }

  @Query(() => GetSessions, { name: 'sessionsNotDue' })
  sessionsNotDue(@Args() paginationArgs: PaginationArgs, @CurrentUser() user) {
    console.log('sessionsNotDue ===> ', user);
    if (user.isAdmin) return this.sessionsService.findNotDue(paginationArgs);
    else if (user.role === 'mentor')
      return this.sessionsService.findNotDue({
        ...paginationArgs,
        mentor: user.id,
      });
    else
      return this.sessionsService.findNotDue({
        ...paginationArgs,
        mentee: user.id,
      });
  }

  @Mutation(() => Session, { name: 'updateSession' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
  ) {
    return this.sessionsService.update(id, updateSessionInput);
  }

  @Query(() => Session, { name: 'session' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sessionsService.findOne(id);
  }

  @Mutation(() => Session)
  removeSession(@Args('id', { type: () => String }) id: string) {
    return this.sessionsService.remove(id);
  }
}
