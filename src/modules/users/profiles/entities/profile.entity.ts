import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Domain } from '@users/domains/entities/domain.entity';
import { AbstractEntity } from '@src/common/abstract.entity';
import { ProfileDto } from '../dto/profile.dto';

@Entity({ name: 'profiles' })
export class ProfileEntity extends AbstractEntity<ProfileDto> {
  @Column({ type: 'varchar', length: 300, nullable: false })
  firstName?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  picture?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  company?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  website?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  linkedin?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  country?: string;

  @Column({ type: 'int', nullable: true })
  yearsOfExperience?: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  domainExpertise?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  coachingType?: string;

  @ManyToMany(() => Domain, { nullable: true })
  @JoinTable()
  coachingDomains?: Domain[];

  @Column({ type: 'text', nullable: true })
  canOffer?: string;

  @Column({ type: 'text', nullable: true })
  professionalBg?: string;

  @Column({ type: 'int', nullable: true })
  hoursPerMonth?: number;

  @Column({ type: 'varchar', length: 300, nullable: true })
  currentPost?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  sector?: string;

  @ManyToOne(() => Domain)
  wantedDomain?: Domain;

  @Column({ type: 'text', nullable: true })
  whyNeedCoaching?: string;

  @Column({ type: 'text', nullable: true })
  selfDescription?: string;

  dtoClass = ProfileDto;
}
