import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsUUID,
} from 'class-validator';
import { User } from '../entities/user.entity';
import { Role } from '../../roles/entities/role.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { CreateProfileInput } from '../../profiles/dto/create-profile.input';
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

  @Field(() => String, { nullable: true })
  @IsUUID()
  role: any;

  @Field(() => CreateProfileInput, { nullable: true })
  profile: any;

  public static async toEntity(inputs: Partial<CreateUserInput>) {
    const it = new User();
    const hash = inputs.password ? await bcrypt.hash(inputs.password, 10) : '';
    it.username = inputs.username;
    it.email = inputs.email;
    it.isAdmin = inputs.isAdmin;
    it.provider = inputs.provider;
    it.providerId = inputs.providerId;
    it.role = inputs.role;
    it.profile = inputs.profile;
    it.password = hash;
    return it;
  }
}
