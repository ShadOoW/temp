import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BadgesService } from './badges.service';
import { CreateBadgeInput } from './dto/create-badge.input';
import { UpdateBadgeInput } from './dto/update-badge.input';
import { BadgeDto } from './dto/badge.dto';
import { BadgesPageDto } from './dto/badges-page.dto';
import { BadgesPageOptionsDto } from './dto/badges-page-options.dto';

@Resolver(() => BadgeDto)
export class BadgesResolver {
  constructor(private readonly badgesService: BadgesService) {}

  @Mutation(() => BadgeDto)
  createBadge(@Args('createBadgeInput') createBadgeInput: CreateBadgeInput) {
    return this.badgesService.create(createBadgeInput);
  }

  @Query(() => BadgesPageDto, { name: 'badges' })
  findAll(@Args() pageOptionsDto: BadgesPageOptionsDto) {
    return this.badgesService.findAll(pageOptionsDto);
  }

  @Query(() => BadgeDto, { name: 'badge' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.badgesService.findOne(id);
  }

  @Mutation(() => BadgeDto)
  updateBadge(
    @Args('id', { type: () => String }) id: string,
    @Args('updateBadgeInput') updateBadgeInput: UpdateBadgeInput,
  ) {
    return this.badgesService.update(id, updateBadgeInput);
  }

  @Mutation(() => BadgeDto)
  removeBadge(@Args('id', { type: () => String }) id: string) {
    return this.badgesService.remove(id);
  }
}
