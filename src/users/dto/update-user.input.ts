import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  firstName: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  lastName: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  phone: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  picture: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  role: Role;

  public static toEntity(inputs: Partial<UpdateUserInput>) {
    const it = new User();
    it.id = inputs.id;
    it.firstName = inputs.firstName;
    it.lastName = inputs.lastName;
    it.phone = inputs.phone;
    it.picture = inputs.picture;
    it.role = inputs.role;
    return it;
  }
}
