import { InputType, Int, Field } from '@nestjs/graphql';
import { CreateProfileDomainInput } from './profile.inputs';

@InputType()
export class CreateProfileInput {
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

  @Field(() => String, { nullable: true })
  domainExpertise?: string;

  @Field(() => String, { nullable: true })
  coachingType?: string;

  @Field(() => [CreateProfileDomainInput])
  coachingDomains?: CreateProfileDomainInput[];

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

  @Field(() => CreateProfileDomainInput, { nullable: true })
  wantedDomain?: CreateProfileDomainInput;

  @Field(() => String, { nullable: true })
  whyNeedCoaching?: string;

  @Field(() => String, { nullable: true })
  selfDescription?: string;
}