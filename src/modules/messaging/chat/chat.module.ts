import { forwardRef, Module } from '@nestjs/common';

import { UsersModule } from '@users/users/users.module';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { MessageRepository } from './message.repository';
import { RoomRepository } from './room.repository';
import { AuthModule } from '@users/auth/auth.module';
import { ConfigService } from '@shared/services/config.service';

@Module({
  providers: [ChatGateway, ChatService, ConfigService],
  imports: [
    TypeOrmModule.forFeature([MessageRepository, RoomRepository]),
    forwardRef(() => UsersModule),
    AuthModule,
  ],
  exports: [TypeOrmModule],
})
export class ChatModule {}
