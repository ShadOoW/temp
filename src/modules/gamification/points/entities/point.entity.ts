import { BadgeEntity } from '../../badges/entities/badge.entity';
import { BalanceEntity } from '../../balances/entities/balance.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PointDto } from '../dto/point.dto';
import { AbstractEntity } from '@src/common/abstract.entity';
import { BadgeDto } from '../../badges/dto/badge.dto';
import { BalanceDto } from '../../balances/dto/balance.dto';

@Entity({ name: 'points' })
export class PointEntity extends AbstractEntity<PointDto> {
  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'varchar', length: 300 })
  action: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  image?: string;

  @ManyToOne(() => BalanceEntity, (balance) => balance.points)
  balance: BalanceDto;

  @ManyToOne(() => BadgeEntity, (badge) => badge.points)
  badge: BadgeDto;

  dtoClass = PointDto;
}
