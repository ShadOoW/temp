import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray, IsOptional } from 'class-validator';
import { Role } from '../entities/role.entity';
import { Permission } from '@users/permissions/entities/permission.entity';
import { RolePermissionInput } from './role.input';
import { User } from '@users/users/entities/user.entity';

@InputType()
export class CreateRoleInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => [RolePermissionInput])
  @IsArray()
  permissions: Permission[];

  // @Field(() => [RolePermissionInput])
  @IsArray()
  @IsOptional()
  users?: User[];

  public static from(dto: Partial<CreateRoleInput>) {
    const it = new CreateRoleInput();
    it.name = dto.name;
    it.description = dto.description;
    it.permissions = dto.permissions;
    return it;
  }

  public static fromEntity(entity: Role) {
    return this.from({
      name: entity.name,
      description: entity.description,
      permissions: entity.permissions,
    });
  }
}
