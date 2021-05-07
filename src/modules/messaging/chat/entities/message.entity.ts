import { Column, Entity, ManyToOne } from 'typeorm';

import { MessageDto } from '../dto/message.dto';
import { UserEntity } from '@users/users/entities/user.entity';
import { RoomEntity } from './room.entity';
import { AbstractEntity } from '@src/common/abstract.entity';

@Entity({ name: 'messages' })
export class MessageEntity extends AbstractEntity<MessageDto> {
  @Column({ nullable: true })
  text: string;

  // @ManyToOne(type => User, {cascade: ['insert', 'update']})
  // @ManyToOne(type => User,)
  // owner: User;

  @ManyToOne(() => UserEntity)
  sender: UserEntity;

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
