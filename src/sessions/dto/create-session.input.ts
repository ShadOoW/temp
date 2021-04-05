import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateSessionInput {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsOptional()
  videoConference?: boolean;

  @Field(() => String)
  mentee: User;

  @Field(() => String)
  mentor: User;
}
