import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '@users/users/entities/user.entity';
import { Status } from '@shared/interfaces/globalStatus';
import { SessionDto } from '../dto/session.dto';
import { AbstractEntity } from '@src/common/abstract.entity';

@Entity({ name: 'sessions' })
export class SessionEntity extends AbstractEntity<SessionDto> {
  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.menteeSessions)
  mentee: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.mentorSessions)
  mentor: UserEntity;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: false })
  isVideoCall?: boolean;

  @Column({ type: 'boolean', default: false })
  isFromMentor?: boolean;

  @Column({
    type: 'enum',
    enum: ['created', 'updated', 'accepted', 'refused', 'activated', 'done'],
    enumName: 'sessionEnum',
    default: 'created',
  })
  status?: Status;

  @Column({ type: 'int', default: 0 })
  duration?: number;

  dtoClass = SessionDto;
}
