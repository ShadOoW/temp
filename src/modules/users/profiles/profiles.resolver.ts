import { UseGuards } from '@nestjs/common';
import { PoliciesGuard } from '@users/casl/guards/check-policies.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileInput } from './dto/update-profile.input';
import {
  AppAbility,
  CaslAbilityFactory,
} from '@users/casl/casl-ability.factory';
import { CheckPolicies } from '@users/casl/decorators/check-policies.decorator';
import { Actions } from '@shared/actions';

@Resolver(() => Profile)
@UseGuards(PoliciesGuard)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Profile))
  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.profilesService.findOne(id);
  }

  @Mutation(() => Profile)
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Update, Profile))
  updateProfile(
    @Args('id', { type: () => String }) id: string,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profilesService.update(id, updateProfileInput);
  }
}
