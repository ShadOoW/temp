import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '@users/users/entities/user.entity';
import { AbstractEntity } from '@src/common/abstract.entity';
import { EventDto } from '../dto/event.dto';

@Entity({ name: 'events' })
export class EventEntity extends AbstractEntity<EventDto> {
  @Column({ type: 'varchar', length: 300, nullable: false })
  module: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  command: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  sourceId: string;

  @ManyToOne(() => UserEntity, (user) => user.eventsFrom)
  from?: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.eventsTo)
  to?: UserEntity;

  @Column({ type: 'json', nullable: true })
  payload?: string;

  @Column({ type: 'boolean', default: false })
  read?: boolean;

  dtoClass = EventDto;
}
