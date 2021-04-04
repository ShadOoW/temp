import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PaginationArgs } from '../shared/pagination.args';
import { GetPermissions } from './dto/get-permissions.dto';

@Resolver(() => Permission)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Mutation(() => Permission)
  createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ) {
    return this.permissionsService.create(createPermissionInput);
  }

  @Query(() => GetPermissions, { name: 'permissions' })
  findAll(@Args() paginationArgs: PaginationArgs) {
    return this.permissionsService.findAll(paginationArgs);
  }

  @Query(() => Permission, { name: 'permission' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.permissionsService.findOne(id);
  }

  @Mutation(() => Permission)
  updatePermission(
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
  ) {
    return this.permissionsService.update(
      updatePermissionInput.id,
      updatePermissionInput,
    );
  }

  @Mutation(() => Permission)
  removePermission(@Args('id', { type: () => String }) id: string) {
    return this.permissionsService.remove(id);
  }
}
