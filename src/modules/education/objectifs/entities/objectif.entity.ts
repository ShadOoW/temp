import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '@users/users/entities/user.entity';
import { ObjectifDto } from '../dto/objectif.dto';
import { AbstractEntity } from '@src/common/abstract.entity';

@Entity({ name: 'objectifs' })
export class ObjectifEntity extends AbstractEntity<ObjectifDto> {
  @Column({ type: 'timestamptz' })
  dueDate: Date;

  @Column({ type: 'varchar', length: 300 })
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.menteeObjectifs)
  mentee: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.mentorObjectifs)
  mentor: UserEntity;

  @Column({ type: 'int', nullable: true })
  progression?: number;

  dtoClass = ObjectifDto;
}
