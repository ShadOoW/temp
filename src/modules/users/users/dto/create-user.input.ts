import { Field, InputType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
// import { UserEntity } from '../entities/user.entity';
import { CreateProfileInput } from '@users/profiles/dto/create-profile.input';
// import * as bcrypt from 'bcrypt';

@InputType()
export class CreateUserInput {
  [x: string]: any;
  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
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
  @IsOptional()
  role: any;

  @Field(() => CreateProfileInput, { nullable: true })
  profile: any;
}

