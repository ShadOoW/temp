import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BadgesService } from './badges.service';
import { Badge } from './entities/badge.entity';
import { CreateBadgeInput } from './dto/create-badge.input';
import { UpdateBadgeInput } from './dto/update-badge.input';
import { GetBadges } from './dto/get-badges.dto';
import { PaginationArgs } from '../../shared/pagination.args';

@Resolver(() => Badge)
export class BadgesResolver {
  constructor(private readonly badgesService: BadgesService) {}

  @Mutation(() => Badge)
  createBadge(@Args('createBadgeInput') createBadgeInput: CreateBadgeInput) {
    return this.badgesService.create(createBadgeInput);
  }

  @Query(() => GetBadges, { name: 'badges' })
  findAll(@Args() paginationArgs: PaginationArgs) {
    return this.badgesService.findAll(paginationArgs);
  }

  @Query(() => Badge, { name: 'badge' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.badgesService.findOne(id);
  }

  @Mutation(() => Badge)
  updateBadge(
    @Args('id', { type: () => String }) id: string,
    @Args('updateBadgeInput') updateBadgeInput: UpdateBadgeInput,
  ) {
    return this.badgesService.update(id, updateBadgeInput);
  }

  @Mutation(() => Badge)
  removeBadge(@Args('id', { type: () => String }) id: string) {
    return this.badgesService.remove(id);
  }
}
