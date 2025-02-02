import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { BadgePointInput } from './badge.inputs';

@InputType()
export class CreateBadgeInput {
  @Field(() => String, { description: 'the name of the badge' })
  @IsString()
  name: string;

  @Field(() => [BadgePointInput], { description: 'badge points' })
  points: BadgePointInput[];

  @Field(() => String, {
    description: 'message to show after get the badge',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  message?: string;

  @Field(() => String, {
    description: 'description of the badge',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, { description: 'image of the badge', nullable: true })
  @IsString()
  @IsOptional()
  image?: string;
}
