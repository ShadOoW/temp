import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  picture?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  website?: string;

  @Field(() => String, { nullable: true })
  linkedin?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => Int, { nullable: true })
  yearsOfExperience?: number;

  @Field(() => Int, { nullable: true })
  domainExpertise?: string;

  @Field(() => String, { nullable: true })
  coachingType?: string;

  @Field(() => [String], { nullable: true })
  coachingDomains?: string[];

  @Field(() => String, { nullable: true })
  canOffer?: string;

  @Field(() => String, { nullable: true })
  professionalBg?: string;

  @Field(() => Int, { nullable: true })
  hoursPerMonth?: number;

  @Field(() => String, { nullable: true })
  currentPost?: string;

  @Field(() => String, { nullable: true })
  sector?: string;

  @Field(() => String, { nullable: true })
  wantedDomain?: string;

  @Field(() => String, { nullable: true })
  whyNeedCoaching?: string;

  @Field(() => String, { nullable: true })
  selfDescription?: string;
}
