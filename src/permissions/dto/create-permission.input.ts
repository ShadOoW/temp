import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Permission } from '../entities/permission.entity';

@InputType()
export class CreatePermissionInput implements Readonly<CreatePermissionInput> {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  public static from(dto: Partial<CreatePermissionInput>) {
    const it = new CreatePermissionInput();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: Permission) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
    });
  }

  public toEntity() {
    const it = new Permission();
    it.id = this.id;
    it.name = this.name;
    it.description = this.description;
    it.createdAt = new Date();
    return it;
  }
}
