import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AppAbility } from '@users/casl/casl-ability.factory';
import { CheckPolicies } from '@src/decorators/check-policies.decorator';
import { PoliciesGuard } from '@src/guards/check-policies.guard';
import { Actions } from '@shared/actions';
import { PermissionsService } from './permissions.service';
import { PermissionEntity } from './entities/permission.entity';
import { CreatePermissionInput } from './dto/create-permission.input';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PermissionDto } from './dto/permission.dto';
import { PermissionsPageDto } from './dto/permissions-page.dto';
import { PermissionsPageOptionsDto } from './dto/permissions-page-options.dto';

@Resolver(() => PermissionDto)
@UseGuards(PoliciesGuard)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Mutation(() => PermissionDto)
  createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ): Promise<PermissionDto> {
    return this.permissionsService.create(createPermissionInput);
  }

  @Query(() => PermissionsPageDto, { name: 'permissions' })
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Read, PermissionEntity),
  )
  findAll(@Args() pageOptionsDto: PermissionsPageOptionsDto) {
    return this.permissionsService.findAll(pageOptionsDto);
  }

  @Query(() => PermissionDto, { name: 'permission' })
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Read, PermissionEntity),
  )
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.permissionsService.findOne(id);
  }

  @Mutation(() => PermissionDto)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Update, PermissionEntity),
  )
  updatePermission(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePermissionInput') updatePermissionInput: UpdatePermissionInput,
  ) {
    return this.permissionsService.update(id, updatePermissionInput);
  }

  @Mutation(() => PermissionDto)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Delete, PermissionEntity),
  )
  removePermission(@Args('id', { type: () => String }) id: string) {
    return this.permissionsService.remove(id);
  }
}
