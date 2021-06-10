import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '@users/users/entities/user.entity';
import { ObjectifDto } from '../dto/objectif.dto';
import { AbstractEntity } from '@src/common/abstract.entity';

@Entity({ name: 'objectifs' })
export class ObjectifEntity extends AbstractEntity<ObjectifDto> {
  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  type: string;

  @ManyToOne(() => UserEntity, (user) => user.menteeObjectifs)
  mentee: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.mentorObjectifs)
  mentor: UserEntity;

  @Column({ type: 'int', nullable: true, default: 0 })
  progression?: number;

  dtoClass = ObjectifDto;
}
