import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@InputType()
export class CreateSessionInput {
  @Field(() => String)
  @IsDateString()
  startDate: Date;

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
  isVideoCall?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean)
  isFromMentor?: boolean;

  @Field(() => String)
  mentee: User;

  @Field(() => String)
  mentor: User;
}
