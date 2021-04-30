import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PointEntity } from '../../points/entities/point.entity';
import { BaseEntity } from '@shared/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PointDto } from '../../points/dto/point.dto';

@ObjectType()
@Entity({ name: 'balances' })
export class Balance extends BaseEntity {
  @Field(() => Int)
  @Column({ type: 'int' })
  score: number;

  @OneToMany(() => PointEntity, (point) => point.balance)
  points: PointDto[];
}
