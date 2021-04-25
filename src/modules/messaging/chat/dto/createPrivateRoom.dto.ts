'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '@users/users/entities/user.entity';

export class CreatePrivateRoomDto {
  @IsNotEmpty()
  @ApiProperty()
  sender: UserEntity;

  @IsNotEmpty()
  @ApiProperty()
  receiver: UserEntity;

  // @ApiProperty()
  // members: UserEntity[];
  //
}
