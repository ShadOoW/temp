import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PointsService } from './points.service';
import { Point } from './entities/point.entity';
import { CreatePointInput } from './dto/create-point.input';
import { UpdatePointInput } from './dto/update-point.input';
import { GetPoints } from './dto/get-points.dto';
import { PaginationArgs } from '../shared/pagination.args';

@Resolver(() => Point)
export class PointsResolver {
  constructor(private readonly pointsService: PointsService) {}

  @Mutation(() => Point)
  createPoint(@Args('createPointInput') createPointInput: CreatePointInput) {
    return this.pointsService.create(createPointInput);
  }

  @Query(() => GetPoints, { name: 'points' })
  findAll(@Args() paginationArgs: PaginationArgs) {
    return this.pointsService.findAll(paginationArgs);
  }

  @Query(() => Point, { name: 'point' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.pointsService.findOne(id);
  }

  @Mutation(() => Point)
  updatePoint(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePointInput') updatePointInput: UpdatePointInput,
  ) {
    return this.pointsService.update(id, updatePointInput);
  }

  @Mutation(() => Point)
  removePoint(@Args('id', { type: () => String }) id: string) {
    return this.pointsService.remove(id);
  }
}
