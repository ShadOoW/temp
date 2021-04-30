import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
// import { RoomEntity } from '../entities/room.entity';

export class CreatePrivateMessageDto {
  // @IsString()
  // @IsNotEmpty()
  text: string;

  // @IsUUID()
  receiver: string;

  // @IsUUID()
  room: string;

  constructor(text, room) {
    this.text = text;
    this.room = room;
  }
}
