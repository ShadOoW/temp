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
import { UsersPageOptionsDto } from './dto/users-page-options.dto';
import { UsersPageDto } from './dto/users-page.dto';

@Resolver(() => UserDto)
@UseGuards(PoliciesGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Query(() => Boolean, { name: 'emailExists' })
  async emailExists(@Args('email', { type: () => String }) email: string) {
    return !!(await this.usersService.findByUserName({ email }));
  }

  @Mutation(() => UserDto)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserDto> {
    return await this.usersService.create(createUserInput);
  }

  // @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => UsersPageDto, { name: 'users' })
  findAll(@Args() pageOptionsDto: UsersPageOptionsDto) {
    return this.usersService.findAll(pageOptionsDto);
  }

  // @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => UsersPageDto, { name: 'usersByRole' })
  findByRole(
    @Args() pageOptionsDto: UsersPageOptionsDto,
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.usersService.findByRole(id, pageOptionsDto);
  }

  // @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => UserDto, { name: 'userRequests' })
  findUserRequests(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findUserRequests(id);
  }

  // @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => UserDto, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Actions.Update, UserEntity),
  // )
  @Mutation(() => UserDto)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Actions.Delete, UserEntity),
  // )
  @Mutation(() => UserDto)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
