import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '@users/users/entities/user.entity';
import { Status } from '@shared/interfaces/globalStatus';
import { AbstractEntity } from '@src/common/abstract.entity';
import { RequestDto } from '../dto/request.dto';

@Entity({ name: 'requests' })
export class RequestEntity extends AbstractEntity<RequestDto> {
  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  excerpt: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  proposition?: boolean;

  @Column({
    type: 'enum',
    enum: ['created', 'updated', 'accepted', 'refused'],
    enumName: 'statusEnum',
    default: 'created',
  })
  status?: Status;

  @ManyToOne(() => UserEntity, (user) => user.requestsTo)
  to?: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.requestsFrom)
  from: UserEntity;

  dtoClass = RequestDto;
}
