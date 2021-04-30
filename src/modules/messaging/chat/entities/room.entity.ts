import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

import { BaseEntity } from '@shared/base.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { MessageEntity } from './message.entity';
import { RoomDto } from '../dto/room.dto';

@Entity({ name: 'rooms' })
export class RoomEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  // @ManyToOne(type => User, {cascade: ['insert', 'update']})
  // @ManyToOne(type => User,)
  // owner: User;

  @ManyToMany(() => UserEntity, (user) => user.rooms, { cascade: true })
  @JoinTable()
  members?: UserEntity[];

  @OneToMany(() => MessageEntity, (message) => message.room)
  messages?: MessageEntity[];

  // @ManyToOne(type => User, message => message.received_messages)
  // group: User;

  @Column({ default: true })
  isPrivate?: boolean;

  dtoClass = RoomDto;
}
