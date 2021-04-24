import { EntityRepository, Repository } from 'typeorm';

import { RoomEntity } from './entities/room.entity';
import { User } from '../../users-service/users/entities/user.entity';
import { CreateRoomDto } from './dto/createRoom.dto';
// import { CreatePrivateRoomDto } from './dto/createPrivateRoom.dto';

@EntityRepository(RoomEntity)
export class RoomRepository extends Repository<RoomEntity> {
  initJoin(user: User, client) {
    // join connected user to all the rooms that is member of.

    const roomsToJoin = [];
    user.rooms.forEach((room) => {
      return roomsToJoin.push(room.name);
    });

    client.join(roomsToJoin);
  }

  async join(room: RoomEntity, user: User) {
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
    await this.save(nroom);
    return nroom;
  }

  async checkPrivateRoomExists(sender, receiver): Promise<RoomEntity> {
    return await this.findOne({
      name: this.generatePrivateRoomName(sender, receiver),
    });
  }

  generatePrivateRoomName(sender, receiver): string {
    if (sender.email.localeCompare(receiver.email) === -1) {
      // firstUsername is "<" (before) secondUsername
      return sender.email + '-' + receiver.email;
    } else if (sender.email.localeCompare(receiver.email) === 1) {
      // firstUsername is ">" (after) secondUsername
      return receiver.email + '-' + sender.email;
    } else {
      return 'falsesss';
      // ids are equal, should throw an error
    }
  }
}
