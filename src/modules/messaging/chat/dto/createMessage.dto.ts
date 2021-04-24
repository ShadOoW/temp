'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  text: string;

  // @IsUUID()
  // @IsNotEmpty()
  // @ApiProperty()
  // sender: UserEntity;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  room_name: string;

  constructor(text, room) {
    this.text = text;
    this.room_name = room;
  }
}
