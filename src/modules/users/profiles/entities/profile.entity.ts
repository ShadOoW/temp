import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from '@src/common/abstract.entity';
import { ProfileDto } from '../dto/profile.dto';
import { DomainDto } from '../../domains/dto/domain.dto';
import { DomainEntity } from '../../domains/entities/domain.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UserDto } from '../../users/dto/user.dto';

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
  geoZone?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  projectType?: string;

  @Column({ type: 'simple-array', nullable: true })
  spokenLanguages?: string[];

  @Column({ type: 'varchar', length: 300, nullable: true })
  website?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  linkedin?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  facebook?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  twitter?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  country?: string;

  @Column({ type: 'int', nullable: true })
  yearsOfExperience?: number;

  @ManyToMany(() => DomainEntity, { nullable: true })
  @JoinTable()
  domainExpertise?: DomainDto[];

  @Column({ type: 'varchar', length: 300, nullable: true })
  coachingType?: string;

  @ManyToMany(() => DomainEntity, { nullable: true })
  @JoinTable()
  coachingDomains?: DomainDto[];

  @Column({ type: 'text', nullable: true })
  canOffer?: string;

  @Column({ type: 'text', nullable: true })
  professionalBg?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  hoursPerMonth?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  currentPost?: string;

  @ManyToOne(() => DomainEntity, (domain) => domain.profiles)
  @JoinTable()
  sector?: string;

  @ManyToMany(() => DomainEntity)
  @JoinTable()
  wantedDomains?: DomainDto[];

  @Column({ type: 'text', nullable: true })
  whyNeedCoaching?: string;

  @Column({ type: 'text', nullable: true })
  selfDescription?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  projectCountry?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  projectRegion?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  projectCity?: string;

  @OneToOne(() => UserEntity, (user) => user.profile)
  user: UserDto;

  dtoClass = ProfileDto;
}
