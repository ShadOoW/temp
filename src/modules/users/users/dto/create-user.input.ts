import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { UserEntity } from '../entities/user.entity';
import { CreateProfileInput } from '@users/profiles/dto/create-profile.input';
import * as bcrypt from 'bcrypt';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String)
  @IsString()
  provider: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  providerId?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  isAdmin: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @Field(() => String, { nullable: true })
  @IsUUID()
  role: any;

  @Field(() => CreateProfileInput, { nullable: true })
  profile: any;
}
