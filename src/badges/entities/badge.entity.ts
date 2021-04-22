import { ObjectType, Field } from '@nestjs/graphql';
import { Point } from '../../points/entities/point.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/base.entity';

@ObjectType()
@Entity({ name: 'badges' })
export class Badge extends BaseEntity {
  @Field(() => String, { description: 'the name of the badge' })
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Field(() => String, { description: 'message to show after get the badge' })
  @Column({ type: 'text', nullable: true })
  message?: string;

  @Field(() => String, { description: 'description of the badge' })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => String, { description: 'image of the badge' })
  @Column({ type: 'varchar', length: 300, nullable: true })
  image?: string;

  @OneToMany(() => Point, (point) => point.badge)
  points: Point[];
}
