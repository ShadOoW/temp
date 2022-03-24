import { Entity, Column, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { DomainDto } from '../dto/domain.dto';
import { AbstractEntity } from '@src/common/abstract.entity';
import { ProfileDto } from '../../profiles/dto/profile.dto';
import { ProfileEntity } from '../../profiles/entities/profile.entity';

@ObjectType()
@Entity({ name: 'domains' })
export class DomainEntity extends AbstractEntity<DomainDto> {
  @Field(() => String)
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  type?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  @Field(() => String, { nullable: true })
  parent?: string;

  @OneToMany(() => ProfileEntity, (profile) => profile.sector)
  profiles?: ProfileDto[];

  dtoClass = DomainDto;
}
