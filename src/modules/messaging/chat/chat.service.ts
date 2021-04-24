import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { InjectRepository } from '@nestjs/typeorm';
// import { UserRepository } from '../user/user.repository';
// import { CreateMessageDto } from './dto/createMessage.dto';
import { RoomRepository } from './room.repository';
import { MessageEntity } from './entities/message.entity';
import { User } from '@users/users/entities/user.entity';
import { RoomEntity } from './entities/room.entity';
import { RoomDto } from './dto/Room.dto';
import { CreateRoomDto } from './dto/createRoom.dto';
import { CreatePrivateRoomDto } from './dto/createPrivateRoom.dto';
import { CreateMessageDto } from './dto/createMessage.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(MessageRepository)
    public readonly messageRepository: MessageRepository,
    // @InjectRepository(UserRepository)
    // public readonly userRepository: UserRepository,
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
    sender: User,
    receiver: User,
    msg: string,
  ): Promise<MessageEntity> {
    let room = await this.roomRepository.checkPrivateRoomExists(
      sender,
      receiver,
    );
    if (!room) {
      room = await this.roomRepository.createPrivateRoom(sender, receiver);
    }
    return this.messageRepository.save({
      text: msg,
      room: room,
      sender: sender,
    });
  }

  /*
   * check if user is joined the room before, if yes then save the message in room.
   */
  async createPublicRoomMessage(
    sender: User,
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

  async joinRoom(room: RoomEntity, user: User): Promise<boolean> {
    return await this.roomRepository.join(room, user);
  }
}
