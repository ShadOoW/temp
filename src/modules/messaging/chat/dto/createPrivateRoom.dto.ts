'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '@users/users/entities/user.entity';

export class CreatePrivateRoomDto {
  @IsNotEmpty()
  @ApiProperty()
  sender: User;

  @IsNotEmpty()
  @ApiProperty()
  receiver: User;

  // @ApiProperty()
  // members: UserEntity[];
  //
}
