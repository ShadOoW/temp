import { CreateBadgeInput } from './create-badge.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { BadgePointInput } from './badge.inputs';

@InputType()
export class UpdateBadgeInput extends PartialType(CreateBadgeInput) {
  @Field(() => String, { description: 'the name of the badge', nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field(() => [BadgePointInput], {
    description: 'badge points',
    nullable: true,
  })
  points?: BadgePointInput[];

  @Field(() => String, {
    description: 'message to show after get the badge',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  message?: string;

  @Field(() => String, { description: 'description of the badge' })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => String, { description: 'image of the badge', nullable: true })
  @IsString()
  @IsOptional()
  image?: string;
}
