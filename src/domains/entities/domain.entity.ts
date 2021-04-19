import { Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../../shared/base.entity';

@ObjectType()
@Entity({ name: 'domains' })
export class Domain extends BaseEntity {
  @Field(() => String)
  @Column({ type: 'varchar', length: 300, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String)
  description?: string;
}