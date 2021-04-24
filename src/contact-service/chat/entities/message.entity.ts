import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../../shared/base.entity';
import { MessageDto } from '../dto/Message.dto';
import { User } from '../../../users-service/users/entities/user.entity';
import { RoomEntity } from './room.entity';

@Entity({ name: 'messages' })
export class MessageEntity extends BaseEntity {
  @Column({ nullable: true })
  text: string;

  // @ManyToOne(type => User, {cascade: ['insert', 'update']})
  // @ManyToOne(type => User,)
  // owner: User;

  @ManyToOne(() => User)
  sender: User;

  // @ManyToOne(type => User, user => user.received_messages, {nullable: true})
  // receiver: User;

  @ManyToOne(() => RoomEntity, (room) => room.messages)
  room: RoomEntity;

  // @ManyToOne(type => User, message => message.received_messages)
  // group: User;

  // @Column({default: true})
  // isPrivate: boolean;

  dtoClass = MessageDto;
}
