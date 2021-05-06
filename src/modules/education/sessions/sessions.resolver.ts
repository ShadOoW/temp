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
  findAll(
    @Args('status', { type: () => String, nullable: true }) status: string,
    @Args() pageOptionsDto: SessionsPageOptionsDto,
    @CurrentUser() user,
  ) {
    console.log(user.role, user.id);
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
