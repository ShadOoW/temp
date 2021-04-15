import { forwardRef, Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { MessageRepository } from './message.repository';
import { RoomRepository } from './room.repository';
import { AuthModule } from '../auth/auth.module';
import { UsersRepository } from '../users/users.repository';
import { ConfigService } from '../shared/services/config.service';

@Module({
  providers: [ChatGateway, ChatService, UsersRepository, ConfigService],
  imports: [
    TypeOrmModule.forFeature([MessageRepository, RoomRepository]),
    forwardRef(() => UsersModule),
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class ChatModule {}
