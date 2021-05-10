import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractDto } from '@src/common/dto/abstract.dto';
import { UserDto } from '@src/modules/users/users/dto/user.dto';
import { MessageEntity } from '../entities/message.entity';

@ObjectType()
export class MessageDto extends AbstractDto {
  @Field(() => String)
  text: string;

  @Field(() => UserDto)
  sender: UserDto;

  constructor(msg: MessageEntity) {
    super(msg);
    this.text = msg.text;
    this.sender = msg.sender;
  }
}
