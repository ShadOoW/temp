import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { Public } from '@shared/public.decorator';
import { RoleDto } from './dto/role.dto';
import { UsersPageOptionsDto } from '../users/dto/users-page-options.dto';
import { RolesPageDto } from './dto/roles-page.dto';

@Resolver(() => RoleDto)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => RoleDto)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Public()
  @Query(() => RolesPageDto, { name: 'rolesByNames' })
  findByNames(
    @Args('rolesNames', { type: () => [String] }) rolesNames: string[],
  ) {
    return this.rolesService.findByNames(rolesNames);
  }

  @Query(() => RolesPageDto, { name: 'roles' })
  findAll(@Args() pageOptionsDto: UsersPageOptionsDto) {
    return this.rolesService.findAll(pageOptionsDto);
  }

  @Query(() => RoleDto, { name: 'role' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => RoleDto)
  updateRole(
    @Args('id', { type: () => String }) id: string,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ) {
    return this.rolesService.update(id, updateRoleInput);
  }

  @Mutation(() => RoleDto)
  removeRole(@Args('id', { type: () => String }) id: string) {
    return this.rolesService.remove(id);
  }
}
