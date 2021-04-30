import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PointsService } from './points.service';
import { CreatePointInput } from './dto/create-point.input';
import { UpdatePointInput } from './dto/update-point.input';
import { PointDto } from './dto/point.dto';
import { PointsPageDto } from './dto/points-page.dto';
import { PointsPageOptionsDto } from './dto/points-page-options.dto';

@Resolver(() => PointDto)
export class PointsResolver {
  constructor(private readonly pointsService: PointsService) {}

  @Mutation(() => PointDto)
  createPoint(@Args('createPointInput') createPointInput: CreatePointInput) {
    return this.pointsService.create(createPointInput);
  }

  @Query(() => PointsPageDto, { name: 'points' })
  findAll(@Args() pageOptionsDto: PointsPageOptionsDto) {
    return this.pointsService.findAll(pageOptionsDto);
  }

  @Query(() => PointDto, { name: 'point' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.pointsService.findOne(id);
  }

  @Mutation(() => PointDto)
  updatePoint(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePointInput') updatePointInput: UpdatePointInput,
  ) {
    return this.pointsService.update(id, updatePointInput);
  }

  @Mutation(() => PointDto)
  removePoint(@Args('id', { type: () => String }) id: string) {
    return this.pointsService.remove(id);
  }
}
