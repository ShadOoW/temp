import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { DomainDto } from '../dto/domain.dto';
import { AbstractEntity } from '@src/common/abstract.entity';

@ObjectType()
@Entity({ name: 'domains' })
export class DomainEntity extends AbstractEntity<DomainDto> {
  @Field(() => String)
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  description?: string;

  dtoClass = DomainDto;
}
