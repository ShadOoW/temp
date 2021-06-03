import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateMessageDto } from './dto/createMessage.dto';
import { RoomRepository } from './room.repository';
import { MessageEntity } from './entities/message.entity';
import { UserEntity } from '@users/users/entities/user.entity';
import { RoomEntity } from './entities/room.entity';
// import { RoomDto } from './dto/room.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { CreatePrivateRoomDto } from './dto/create-private-room.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { UserDto } from '@src/modules/users/users/dto/user.dto';
import { MessagesPageOptionsDto } from './dto/messages-page-options.dto';
import { UtilsService } from '@src/providers/utils.service';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { MessagesPageDto } from './dto/messages-page.dto';
// import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageRepository)
    public readonly messageRepository: MessageRepository,
    @InjectRepository(RoomRepository)
    public readonly roomRepository: RoomRepository,
  ) {}

  // deprecated
  async createMessage(msg: CreateMessageDto, sender): Promise<MessageEntity> {
    const created_msg = this.messageRepository.create(msg);
    created_msg.sender = sender;
    return this.messageRepository.save(created_msg);
  }

  /*
   * check room if not exists create it, and save the message in room.
   */
  async createPrivateMessage(
    sender: UserEntity,
    receiver: UserDto,
    msg: string,
  ): Promise<MessageEntity> {
    let room = await this.roomRepository.checkPrivateRoomExists(
      sender,
      receiver,
    );
    if (!room) {
      room = await this.roomRepository.createPrivateRoom(sender, receiver);
    }
    const createdMsg = await this.messageRepository.save({
      text: msg,
      room: room,
      sender: sender,
    });
    return createdMsg;
  }

  async findCreatedMsg(id) {
    const findCreatedMsg = await this.messageRepository.findOne(id, {
      relations: ['sender', 'sender.profile'],
    });
    return findCreatedMsg.toDto();
  }

  /*
   * check if user is joined the room before, if yes then save the message in room.
   */
  async createPublicRoomMessage(
    sender: UserEntity,
    room: RoomEntity,
    msg: string,
  ): Promise<MessageEntity> {
    const alreadyInRoom = room.members.some((ele) => ele.id === sender.id);

    if (!alreadyInRoom) {
      return;
    }
    return this.messageRepository.save({
      text: msg,
      room: room,
      sender: sender,
    });
  }

  async createRoom(data: CreateRoomDto, sender): Promise<any> {
    const createdRoom = await this.roomRepository.createPublicRoom(
      data,
      sender,
    );
    return createdRoom;
  }

  async createPrivateRoom(data: CreatePrivateRoomDto): Promise<any> {
    const createdRoom = await this.roomRepository.createPrivateRoom(
      data.sender,
      data.receiver,
    );
    return createdRoom;
  }

  async joinRoom(room: RoomEntity, user: UserEntity): Promise<boolean> {
    return await this.roomRepository.join(room, user);
  }

  async findAll(pageOptionsDto: MessagesPageOptionsDto) {
    const [messages, messagesCount] = await this.messageRepository.findAndCount(
      {
        where: { room: pageOptionsDto.room },
        relations: ['sender', 'sender.profile'],
        ...UtilsService.pagination(pageOptionsDto),
      },
    );
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: messagesCount,
    });
    return new MessagesPageDto(messages.toDtos(), pageMetaDto);
  }

  async count() {
    return await this.messageRepository.count();
  }
}
