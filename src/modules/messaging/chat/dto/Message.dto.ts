'use strict';

import { ApiProperty } from '@nestjs/swagger';
import { AbstractDto } from '@shared/abstract.dto';
import { MessageEntity } from '../entities/message.entity';

export class MessageDto extends AbstractDto {
  @ApiProperty()
  text: string;

  constructor(msg: MessageEntity) {
    super(msg);
    this.text = msg.text;
  }
}
