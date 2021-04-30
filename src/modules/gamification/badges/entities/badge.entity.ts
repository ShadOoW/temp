import { PointEntity } from '../../points/entities/point.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PointDto } from '../../points/dto/point.dto';
import { BadgeDto } from '../dto/badge.dto';
import { AbstractEntity } from '@src/common/abstract.entity';

@Entity({ name: 'badges' })
export class BadgeEntity extends AbstractEntity<BadgeDto> {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  image?: string;

  @OneToMany(() => PointEntity, (point) => point.badge)
  points: PointDto[];

  dtoClass = BadgeDto;
}
