import { MessageEntity } from '../entities/message.entity';
import { RoomEntity } from '../entities/room.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { AbstractDto } from '@shared/abstract.dto';

export class RoomDto extends AbstractDto {
  name: string;

  isPrivate: boolean;

  members: UserEntity[];

  messages: MessageEntity[];

  constructor(room: RoomEntity) {
    super(room);
    this.name = room.name;
    this.isPrivate = room.isPrivate;
    this.members = room.members;
    this.messages = room.messages;
  }
}
