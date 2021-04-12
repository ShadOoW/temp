import { UseGuards } from '@nestjs/common';
import { PoliciesGuard } from '../casl/guards/check-policies.guard';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { Permission } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PaginationArgs } from '../shared/pagination.args';
import { GetPermissions } from './dto/get-permissions.dto';
import { AppAbility } from '../casl/casl-ability.factory';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { Actions } from '../shared/actions';

@Resolver(() => Permission)
@UseGuards(PoliciesGuard)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Mutation(() => Permission)
  createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ) {
    return this.permissionsService.create(createPermissionInput);
  }

  @Query(() => GetPermissions, { name: 'permissions' })
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Permission))
  findAll(@Args() paginationArgs: PaginationArgs) {
    return this.permissionsService.findAll(paginationArgs);
  }

  @Query(() => Permission, { name: 'permission' })
  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, Permission))
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.permissionsService.findOne(id);
  }

  @Mutation(() => Permission)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Update, Permission),
  )
  updatePermission(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
  ) {
    return this.permissionsService.update(id, updatePermissionInput);
  }

  @Mutation(() => Permission)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Delete, Permission),
  )
  removePermission(@Args('id', { type: () => String }) id: string) {
    return this.permissionsService.remove(id);
  }
}
