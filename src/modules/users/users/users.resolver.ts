import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { PoliciesGuard } from '@src/guards/check-policies.guard';
import { AppAbility } from '@users/casl/casl-ability.factory';
import { CheckPolicies } from '@src/decorators/check-policies.decorator';
import { Actions } from '@shared/actions';
import { Public } from '@shared/public.decorator';
import { UserDto } from './dto/user.dto';

@Resolver(() => UserEntity)
@UseGuards(PoliciesGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Query(() => Boolean, { name: 'emailExists' })
  async emailExists(@Args('email', { type: () => String }) email: string) {
    return !!(await this.usersService.findByUserName({ email }));
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserDto> {
    const createdUser = await this.usersService.create(createUserInput);
    return createdUser.toDto();
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => [UserEntity], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => [UserEntity], { name: 'usersByRole' })
  findByRole(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findByRole(id);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => UserEntity, { name: 'userRequests' })
  findUserRequests(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findUserRequests(id);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => UserEntity, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Update, UserEntity),
  )
  @Mutation(() => UserEntity)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Delete, UserEntity),
  )
  @Mutation(() => UserEntity)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
