import { CreateRoleInput } from './create-role.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsString, IsArray } from 'class-validator';
import { Permission } from '@users/permissions/entities/permission.entity';
import { RolePermissionInput } from './role.input';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => [RolePermissionInput])
  @IsArray()
  permissions: Permission[];
}
