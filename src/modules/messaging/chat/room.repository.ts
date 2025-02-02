import { EntityRepository, Repository } from 'typeorm';

import { RoomEntity } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
// import { UserDto } from '@users/users/dto/user.dto';
import { UserEntity } from '@src/modules/users/users/entities/user.entity';
import { UserDto } from '@src/modules/users/users/dto/user.dto';
// import { CreatePrivateRoomDto } from './dto/createPrivateRoom.dto';

@EntityRepository(RoomEntity)
export class RoomRepository extends Repository<RoomEntity> {
  initJoin(user: UserDto, client) {
    // join connected user to all the rooms that is member of.

    const roomsToJoin = [];
    user.rooms.forEach((room) => {
      return roomsToJoin.push(room.name);
    });

    client.join(roomsToJoin);
  }

  async join(room: RoomEntity, user: UserEntity) {
    if (room.isPrivate && room.members.length >= 2) return false;
    room.members.push(user);
    await this.save(room);
    return true;
  }

  async createPublicRoom(data: CreateRoomDto, sender): Promise<RoomEntity> {
    const nroom = new RoomEntity();
    nroom.members = [sender];
    nroom.isPrivate = false;
    nroom.name = data.name;
    await this.save(nroom);
    return nroom;
  }

  async createPrivateRoom(sender, receiver): Promise<RoomEntity> {
    const nroom = new RoomEntity();
    nroom.members = [sender, receiver];
    nroom.isPrivate = true;
    nroom.name = this.generatePrivateRoomName(sender, receiver);
    console.log('creating new room');
    console.log({nroom});
    await this.save(nroom);
    return nroom;
  }

  async checkPrivateRoomExists(sender, receiver): Promise<RoomEntity> {
    return await this.findOne({
      where: [
        { name: this.generatePrivateRoomName(sender, receiver) },
        { name: this.generatePrivateRoomName(receiver, sender) },
      ],
    });
  }
  async checkAllMessages(roomId, sender, receiver): Promise<RoomEntity> {
    return await this.findOne(
      { id: roomId },
      {
        where: [{ members: [sender, receiver] }],
        relations: ['messages'],
        order: { createdAt: -1 },
      },
    );
  }
  generatePrivateRoomName(sender, receiver): string {
    if (sender.id.localeCompare(receiver.id) === -1) {
      // firstUsername is "<" (before) secondUsername
      return sender.id + '/' + receiver.id;
    } else if (sender.id.localeCompare(receiver.id) === 1) {
      // firstUsername is ">" (after) secondUsername
      return receiver.id + '/' + sender.id;
    } else {
      return 'falsesss';
      // ids are equal, should throw an error
    }
  }
}

