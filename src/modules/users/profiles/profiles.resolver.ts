import { UseGuards } from '@nestjs/common';
import { PoliciesGuard } from '@src/guards/check-policies.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { ProfileEntity } from './entities/profile.entity';
import { UpdateProfileInput } from './dto/update-profile.input';
import {
  AppAbility,
  CaslAbilityFactory,
} from '@users/casl/casl-ability.factory';
import { CheckPolicies } from '@src/decorators/check-policies.decorator';
import { Actions } from '@shared/actions';
import { ProfileDto } from './dto/profile.dto';

@Resolver(() => ProfileDto)
@UseGuards(PoliciesGuard)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Actions.Read, ProfileEntity),
  // )
  @Query(() => ProfileDto, { name: 'profile' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.profilesService.findOne(id);
  }

  @Mutation(() => ProfileDto)
  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Actions.Update, ProfileEntity),
  // )
  updateProfile(
    @Args('id', { type: () => String }) id: string,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profilesService.update(id, updateProfileInput);
  }
}
