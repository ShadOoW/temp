'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from '../entities/message.entity';
import { RoomEntity } from '../entities/room.entity';
import { User } from '../../../users-service/users/entities/user.entity';
import { AbstractDto } from '../../../shared/abstract.dto';

export class RoomDto extends AbstractDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isPrivate: boolean;

  @ApiProperty()
  members: User[];

  @ApiProperty()
  messages: MessageEntity[];

  constructor(room: RoomEntity) {
    super(room);
    this.name = room.name;
    this.isPrivate = room.isPrivate;
    this.members = room.members;
    this.messages = room.messages;
  }
}
