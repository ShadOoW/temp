import { RoomEntity } from '../entities/room.entity';
import { AbstractDto } from '@shared/abstract.dto';
import { UserDto } from '@src/modules/users/users/dto/user.dto';

export class RoomDto extends AbstractDto {
  name: string;

  isPrivate: boolean;

  members: any[];
  message: any;
  // messages: MessageEntity[];

  constructor(room: RoomEntity) {
    super(room);
    this.name = room.name;
    this.isPrivate = room.isPrivate;
    this.message = room.messages[0];
    this.members = room.members.map((member) => ({
      id: member.id,
      email: member.email,
      username: member.status,
      status: member.status,
      firstName: member.profile?.firstName,
      lastName: member.profile?.lastName,
      picture: member.profile?.picture,
    }));
    // this.messages = room.messages;
  }
}
