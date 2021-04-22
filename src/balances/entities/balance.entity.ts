import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Point } from 'src/points/entities/point.entity';
import { Column, OneToMany } from 'typeorm';

@ObjectType()
export class Balance {
  @Field(() => Int)
  @Column({ type: 'int' })
  score: number;

  @OneToMany(() => Point, (point) => point.balance)
  points: Point[];
}
