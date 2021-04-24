import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { PaginationArgs } from '@shared/pagination.args';
import { GetRoles } from './dto/get-roles.dto';
import { Public } from '@shared/public.decorator';

@Resolver(() => Role)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => Role)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Public()
  @Query(() => [Role], { name: 'rolesByNames' })
  findByNames(
    @Args('rolesNames', { type: () => [String] }) rolesNames: string[],
  ) {
    return this.rolesService.findByNames(rolesNames);
  }

  @Query(() => GetRoles, { name: 'roles' })
  findAll(@Args() paginationArgs: PaginationArgs) {
    return this.rolesService.findAll(paginationArgs);
  }

  @Query(() => Role, { name: 'role' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.rolesService.findOne(id);
  }

  @Mutation(() => Role)
  updateRole(
    @Args('id', { type: () => String }) id: string,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ) {
    return this.rolesService.update(id, updateRoleInput);
  }

  @Mutation(() => Role)
  removeRole(@Args('id', { type: () => String }) id: string) {
    return this.rolesService.remove(id);
  }
}
