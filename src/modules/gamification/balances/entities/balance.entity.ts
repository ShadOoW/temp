import { PointEntity } from '../../points/entities/point.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PointDto } from '../../points/dto/point.dto';
import { BalanceDto } from '../dto/balance.dto';
import { AbstractEntity } from '@src/common/abstract.entity';

@Entity({ name: 'balances' })
export class BalanceEntity extends AbstractEntity<BalanceDto> {
  @Column({ type: 'int' })
  score: number;

  @OneToMany(() => PointEntity, (point) => point.balance)
  points: PointDto[];

  dtoClass = BalanceDto;
}
