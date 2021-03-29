import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { Role } from '../../roles/entities/role.entity';

@InputType()
export class CreateUserInput {
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

  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  phone: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  picture: string;

  @Field(() => String)
  @IsString()
  provider: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  providerId: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  isAdmin: boolean;

  @Field(() => String, { nullable: true })
  @IsUUID()
  role: Role;

  public static toEntity(inputs: Partial<CreateUserInput>) {
    const it = new User();
    it.id = inputs.id;
    it.firstName = inputs.firstName;
    it.lastName = inputs.lastName;
    it.username = inputs.username;
    it.email = inputs.email;
    it.phone = inputs.phone;
    it.picture = inputs.picture;
    it.provider = inputs.provider;
    it.providerId = inputs.providerId;
    it.role = inputs.role;
    it.password = inputs.password;
    return it;
  }
}
