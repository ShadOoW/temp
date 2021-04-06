import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Permission } from '../entities/permission.entity';

@InputType()
export class CreatePermissionInput implements Readonly<CreatePermissionInput> {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String)
  @IsString()
  description: string;

  public static from(dto: Partial<CreatePermissionInput>) {
    const it = new CreatePermissionInput();
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: Permission) {
    return this.from({
      name: entity.name,
      description: entity.description,
    });
  }
}
