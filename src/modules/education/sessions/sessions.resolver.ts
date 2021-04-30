import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SessionsService } from './sessions.service';
import { UpdateSessionInput } from './dto/update-session.input';
import { CreateSessionInput } from './dto/create-session.input copy';
import { User as CurrentUser } from '@src/decorators/user.decorator';
import { SessionsPageOptionsDto } from './dto/sessions-page-options.dto';
import { SessionsPageDto } from './dto/sessions-page.dto';
import { SessionDto } from './dto/session.dto';

@Resolver(() => SessionDto)
export class SessionsResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @Mutation(() => SessionDto)
  createSession(
    @Args('createSessionInput') createSessionInput: CreateSessionInput,
  ) {
    return this.sessionsService.create(createSessionInput);
  }

  @Query(() => SessionsPageDto, { name: 'sessions' })
  findAll(@Args() pageOptionsDto: SessionsPageOptionsDto) {
    return this.sessionsService.findAll(pageOptionsDto);
  }

  @Query(() => SessionsPageDto, { name: 'menteeSessions' })
  menteeSessions(
    @Args('status', { type: () => String, nullable: true }) status: string,
    @Args('mentee', { type: () => String }) mentee: string,
    @Args() paginationArgs: SessionsPageOptionsDto,
  ) {
    return this.sessionsService.findAll(paginationArgs, mentee, status);
  }

  @Query(() => SessionsPageDto, { name: 'mentorSessions' })
  mentorSessions(
    @Args('status', { type: () => String, nullable: true }) status: string,
    @Args('mentor', { type: () => String }) mentor: string,
    @Args() paginationArgs: SessionsPageOptionsDto,
  ) {
    return this.sessionsService.findAll(paginationArgs, mentor, status);
  }

  @Query(() => SessionsPageDto, { name: 'sessionsNotDue' })
  sessionsNotDue(
    @Args('status', { type: () => String, nullable: true }) status: string,
    @Args() pageOptionsDto: SessionsPageOptionsDto,
    @CurrentUser() user,
  ) {
    if (user.isAdmin)
      return this.sessionsService.findNotDue(pageOptionsDto, status);
    else if (user.role === 'mentor')
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
  ) {
    return this.sessionsService.update(id, updateSessionInput);
  }

  @Query(() => SessionDto, { name: 'session' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.sessionsService.findOne(id);
  }

  @Mutation(() => SessionDto)
  removeSession(@Args('id', { type: () => String }) id: string) {
    return this.sessionsService.remove(id);
  }
}
