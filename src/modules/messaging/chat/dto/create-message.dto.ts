import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  // @IsUUID()
  // @IsNotEmpty()
  // @ApiProperty()
  // sender: UserEntity;

  @IsString()
  @IsNotEmpty()
  room_name: string;

  constructor(text, room) {
    this.text = text;
    this.room_name = room;
  }
}
