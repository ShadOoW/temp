import { Resolver, Query, Mutation, Args, Float } from '@nestjs/graphql';
import { ObjectifsService } from './objectifs.service';
import { UpdateObjectifInput } from './dto/update-objectif.input';
import { CreateObjectifInput } from './dto/create-objectif.input';
// import { User as CurrentUser } from '@src/decorators/user.decorator';
import { ObjectifsPageOptionsDto } from './dto/objectifs-page-options.dto';
import { ObjectifsPageDto } from './dto/objectifs-page.dto';
import { ObjectifDto } from './dto/objectif.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Resolver(() => ObjectifDto)
export class ObjectifsResolver {
  constructor(
    private readonly objectifsService: ObjectifsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Mutation(() => ObjectifDto)
  createObjectif(
    @Args('createObjectifInput') createObjectifInput: CreateObjectifInput,
  ) {
    return this.objectifsService.create(createObjectifInput).then((event) => {
      // this.eventEmitter.emit('objectif.created', { ...event, userId });
      return event;
    });
  }

  @Query(() => ObjectifsPageDto, { name: 'objectifs' })
  async findAll(
    @Args() pageOptionsDto: ObjectifsPageOptionsDto,
    @Args('mentor', { type: () => String }) mentor: string,
    @Args('mentee', { type: () => String }) mentee: string,
  ) {
    return this.objectifsService.findAll(pageOptionsDto, mentor, mentee);
  }

  @Query(() => Float, { name: 'overallProgression' })
  async overallProgression(
    @Args('mentor', { type: () => String }) mentor: string,
    @Args('mentee', { type: () => String }) mentee: string,
  ) {
    return this.objectifsService.overallProgression(mentor, mentee);
  }

  @Mutation(() => ObjectifDto, { name: 'updateObjectif' })
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateObjectifInput') updateObjectifInput: UpdateObjectifInput,
  ) {
    return this.objectifsService
      .update(id, updateObjectifInput)
      .then((event) => {
        // this.eventEmitter.emit('objectif.updated', { ...event, userId });
        return event;
      });
  }

  @Query(() => ObjectifDto, { name: 'objectif' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.objectifsService.findOne(id);
  }

  @Mutation(() => ObjectifDto)
  removeObjectif(@Args('id', { type: () => String }) id: string) {
    return this.objectifsService.remove(id).then((event) => {
      // this.eventEmitter.emit('objectif.deleted', { ...event, userId });
      return event;
    });
  }
}
