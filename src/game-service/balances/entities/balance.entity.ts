import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Point } from '../../points/entities/point.entity';
import { BaseEntity } from '../../../shared/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'balances' })
export class Balance extends BaseEntity {
  @Field(() => Int)
  @Column({ type: 'int' })
  score: number;

  @OneToMany(() => Point, (point) => point.balance)
  points: Point[];
}
