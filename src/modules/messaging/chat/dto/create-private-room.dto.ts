import { IsNotEmpty } from 'class-validator';
import { UserEntity } from '@users/users/entities/user.entity';

export class CreatePrivateRoomDto {
  @IsNotEmpty()
  sender: UserEntity;

  @IsNotEmpty()
  receiver: UserEntity;

  // @ApiProperty()
  // members: UserEntity[];
  //
}
