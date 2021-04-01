import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.profilesService.findOne(id);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profilesService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }
}
