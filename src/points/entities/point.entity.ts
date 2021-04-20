import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@ObjectType()
@Entity({ name: 'points' })
export class Point extends BaseEntity {
  @Field(() => Int, { description: 'action point value' })
  @Column({ type: 'int' })
  number: number;

  @Field(() => String, { description: 'the action to get the point' })
  @Column({ type: 'varchar', length: 300 })
  action: string;

  @Field(() => String, { description: 'message to show after get the point' })
  @Column({ type: 'text', nullable: true })
  message?: string;

  @Field(() => String, { description: 'description of the point' })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => String, { description: 'image of the point' })
  @Column({ type: 'varchar', length: 300, nullable: true })
  image?: string;
}
