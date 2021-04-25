import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '@config/config.service';
// import { RoomRepository } from '../chat/room.repository';
// import { ChatService } from '../chat/chat.service';
// import { MessageRepository } from '../chat/message.repository';
// import { MessageEntity } from 'src/chat/entities/message.entity';
import { RoomEntity } from '@messaging/chat/entities/room.entity';
import { UsersService } from '@users/users/users.service';
import { UserEntity } from '@users/users/entities/user.entity';
import { Profile } from '@users/profiles/entities/profile.entity';
import { ProfilesService } from '@users/profiles/profiles.service';

export async function chatSeed() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const roomRepo = connection.getRepository(RoomEntity);
  const userService = new UsersService(
    connection.getRepository(UserEntity),
    new ProfilesService(connection.getRepository(Profile)),
  );
  const nroom = new RoomEntity();
  nroom.members = await userService.findOne(
    '1af906bf-725f-413c-bd9c-f63b98068d6f',
  );
  nroom.isPrivate = false;
  nroom.name = 'room1';

  await roomRepo
    .save(nroom)
    .then((r) => (console.log(`room done ->`, r.name), r))
    .catch((e) => console.log(`room -> error`, e));

  return await connection.close();
}
