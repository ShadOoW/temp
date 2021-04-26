import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsArray, IsOptional } from 'class-validator';
import { RoleEntity } from '../entities/role.entity';
import { PermissionEntity } from '@users/permissions/entities/permission.entity';
import { RolePermissionInput } from './role.input';
import { UserEntity } from '@users/users/entities/user.entity';

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
  permissions: PermissionEntity[];

  // @Field(() => [RolePermissionInput])
  @IsArray()
  @IsOptional()
  users?: UserEntity[];

  public static from(dto: Partial<CreateRoleInput>) {
    const it = new CreateRoleInput();
    it.name = dto.name;
    it.description = dto.description;
    it.permissions = dto.permissions;
    return it;
  }

  public static fromEntity(entity: RoleEntity) {
    return this.from({
      name: entity.name,
      description: entity.description,
      permissions: entity.permissions,
    });
  }
}
