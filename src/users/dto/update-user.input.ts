import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsEmail, IsBoolean } from 'class-validator';
import { User } from '../entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { UserStatus } from '../interfaces/user';

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  status?: UserStatus;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  role: Role;
}
