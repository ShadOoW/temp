import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { DomainDto } from '../../domains/dto/domain.dto';
import { ProfileEntity } from '../entities/profile.entity';

@ObjectType()
export class ProfileDto extends AbstractDto {
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
  geoZone?: string;

  @Field(() => String, { nullable: true })
  projectType?: string;

  @Field(() => [String], { nullable: true })
  spokenLanguages?: string[];

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

  @Field(() => Int, { nullable: true })
  yearsOfExperience?: number;

  @Field(() => [DomainDto], { nullable: true })
  domainExpertise?: DomainDto[];

  @Field(() => String, { nullable: true })
  coachingType?: string;

  @Field(() => [DomainDto], { nullable: true })
  coachingDomains?: DomainDto[];

  @Field(() => String, { nullable: true })
  canOffer?: string;

  @Field(() => String, { nullable: true })
  professionalBg?: string;

  @Field(() => String, { nullable: true })
  hoursPerMonth?: string;

  @Field(() => String, { nullable: true })
  currentPost?: string;

  @Field(() => DomainDto, { nullable: true })
  sector?: DomainDto;

  @Field(() => [DomainDto], { nullable: true })
  wantedDomains?: DomainDto[];

  @Field(() => String, { nullable: true })
  whyNeedCoaching?: string;

  @Field(() => String, { nullable: true })
  selfDescription?: string;

  constructor(profile: ProfileEntity) {
    super(profile);
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.picture = profile.picture;
    this.phoneNumber = profile.phoneNumber;
    this.city = profile.city;
    this.company = profile.company;
    this.geoZone = profile.geoZone;
    this.projectType = profile.projectType;
    this.spokenLanguages = profile.spokenLanguages;
    this.website = profile.website;
    this.linkedin = profile.linkedin;
    this.twitter = profile.twitter;
    this.facebook = profile.facebook;
    this.country = profile.country;
    this.yearsOfExperience = profile.yearsOfExperience;
    this.domainExpertise = profile.domainExpertise;
    this.coachingDomains = profile.coachingDomains;
    this.coachingType = profile.coachingType;
    this.canOffer = profile.canOffer;
    this.professionalBg = profile.professionalBg;
    this.hoursPerMonth = profile.hoursPerMonth;
    this.currentPost = profile.currentPost;
    this.sector = profile.sector;
    this.wantedDomains = profile.wantedDomains;
    this.whyNeedCoaching = profile.whyNeedCoaching;
    this.selfDescription = profile.selfDescription;
  }
}
