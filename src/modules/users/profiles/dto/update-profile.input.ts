import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateProfileDomainInput } from './profile.inputs';

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
  facebook?: string;

  @Field(() => String, { nullable: true })
  twitter?: string;

  @Field(() => String, { nullable: true })
  country?: string;

  @Field(() => String, { nullable: true })
  geoZone?: string;

  @Field(() => String, { nullable: true })
  projectType?: string;

  @Field(() => [String], { nullable: true })
  spokenLanguages?: string[];

  @Field(() => Int, { nullable: true })
  yearsOfExperience?: number;

  @Field(() => [CreateProfileDomainInput], { nullable: true })
  domainExpertise?: CreateProfileDomainInput[];

  @Field(() => String, { nullable: true })
  coachingType?: string;

  @Field(() => [CreateProfileDomainInput], { nullable: true })
  coachingDomains?: CreateProfileDomainInput[];

  @Field(() => String, { nullable: true })
  canOffer?: string;

  @Field(() => String, { nullable: true })
  professionalBg?: string;

  @Field(() => String, { nullable: true })
  hoursPerMonth?: string;

  @Field(() => String, { nullable: true })
  currentPost?: string;

  @Field(() => CreateProfileDomainInput, { nullable: true })
  sector?: CreateProfileDomainInput;

  @Field(() => [CreateProfileDomainInput], { nullable: true })
  wantedDomains?: CreateProfileDomainInput[];

  @Field(() => String, { nullable: true })
  whyNeedCoaching?: string;

  @Field(() => String, { nullable: true })
  selfDescription?: string;
}
