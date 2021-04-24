import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { PoliciesGuard } from '@users/casl/guards/check-policies.guard';
import { AppAbility } from '@users/casl/casl-ability.factory';
import { CheckPolicies } from '@users/casl/decorators/check-policies.decorator';
import { Actions } from '@shared/actions';
import { Public } from '@shared/public.decorator';

@Resolver(() => User)
@UseGuards(PoliciesGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Query(() => Boolean, { name: 'emailExists' })
  async emailExists(@Args('email', { type: () => String }) email: string) {
    return !!(await this.usersService.findByUserName({ email }));
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.usersService.create(createUserInput);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, User))
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, User))
  @Query(() => [User], { name: 'usersByRole' })
  findByRole(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findByRole(id);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, User))
  @Query(() => User, { name: 'userRequests' })
  findUserRequests(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findUserRequests(id);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, User))
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Update, User))
  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Delete, User))
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
