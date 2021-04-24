import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity } from '../../../shared/base.entity';
import { Domain } from '../../domains/entities/domain.entity';

@ObjectType()
@Entity({ name: 'profiles' })
export class Profile extends BaseEntity {
  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: false })
  firstName?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  picture?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  company?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  website?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  linkedin?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  country?: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  yearsOfExperience?: number;

  @Field(() => String, { nullable: true })
  domainExpertise?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  coachingType?: string;

  @Field(() => [Domain])
  @ManyToMany(() => Domain, { nullable: true })
  @JoinTable()
  coachingDomains?: Domain[];

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  canOffer?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  professionalBg?: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  hoursPerMonth?: number;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  currentPost?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', length: 300, nullable: true })
  sector?: string;

  @ManyToOne(() => Domain)
  @Field(() => Domain, { nullable: true })
  wantedDomain?: Domain;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  whyNeedCoaching?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  selfDescription?: string;
}
