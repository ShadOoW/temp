import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ObjectifsService } from './objectifs.service';
import { UpdateObjectifInput } from './dto/update-objectif.input';
import { CreateObjectifInput } from './dto/create-objectif.input';
import { User as CurrentUser } from '@src/decorators/user.decorator';
import { ObjectifsPageOptionsDto } from './dto/objectifs-page-options.dto';
import { ObjectifsPageDto } from './dto/objectifs-page.dto';
import { ObjectifDto } from './dto/objectif.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsersService } from '@users/users/users.service';

@Resolver(() => ObjectifDto)
export class ObjectifsResolver {
  constructor(
    private readonly objectifsService: ObjectifsService,
    private eventEmitter: EventEmitter2,
    private usersService: UsersService,
  ) {}

  @Mutation(() => ObjectifDto)
  createObjectif(
    @Args('createObjectifInput') createObjectifInput: CreateObjectifInput,
    @CurrentUser() userId,
  ) {
    return this.objectifsService.create(createObjectifInput).then((event) => {
      this.eventEmitter.emit('objectif.created', { ...event, userId });
      return event;
    });
  }

  @Query(() => ObjectifsPageDto, { name: 'objectifs' })
  async findAll(
    @Args('status', { type: () => String, nullable: true }) status: string,
    @Args() pageOptionsDto: ObjectifsPageOptionsDto,
    @CurrentUser() userId,
  ) {
    const user = await this.usersService.findOne(userId);
    if (user.isAdmin)
      return this.objectifsService.findAll(pageOptionsDto, status);
    else if (user.role?.name === 'mentor')
      return this.objectifsService.findAll(pageOptionsDto, status, userId);
    else
      return this.objectifsService.findAll(
        pageOptionsDto,
        status,
        undefined,
        userId,
      );
  }

  @Mutation(() => ObjectifDto, { name: 'updateObjectif' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateObjectifInput') updateObjectifInput: UpdateObjectifInput,
    @CurrentUser() userId,
  ) {
    return this.objectifsService
      .update(id, updateObjectifInput)
      .then((event) => {
        this.eventEmitter.emit('objectif.updated', { ...event, userId });
        return event;
      });
  }

  @Query(() => ObjectifDto, { name: 'objectif' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.objectifsService.findOne(id);
  }

  @Mutation(() => ObjectifDto)
  removeObjectif(
    @Args('id', { type: () => String }) id: string,
    @CurrentUser() userId,
  ) {
    return this.objectifsService.remove(id).then((event) => {
      this.eventEmitter.emit('objectif.deleted', { ...event, userId });
      return event;
    });
  }
}
