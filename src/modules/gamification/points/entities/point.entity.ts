import { Badge } from '../../badges/entities/badge.entity';
import { Balance } from '../../balances/entities/balance.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PointDto } from '../dto/point.dto';
import { AbstractEntity } from '@src/common/abstract.entity';

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

  @ManyToOne(() => Balance, (balance) => balance.points)
  balance: Balance;

  @ManyToOne(() => Badge, (badge) => badge.points)
  badge: Badge;

  dtoClass = PointDto;
}
