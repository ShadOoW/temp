import {
  Logger,
  OnModuleInit,
  // UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as socketioJwt from 'socketio-jwt';

import { UsersService } from '@users/users/users.service';
import { ConfigService } from '@shared/services/config.service';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { RedisService } from 'nestjs-redis';
import { CreateRoomDto } from './dto/create-room.dto';
import { CreatePrivateMessageDto } from './dto/create-private-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomRepository } from './room.repository';
import { UtilsService } from '@shared/providers/utils.service';
import { AuthService } from '@users/auth/auth.service';
import { RoomEntity } from './entities/room.entity';
import { JoinRoomDto } from './dto/join-room.dto';
import { UserEntity } from '@src/modules/users/users/entities/user.entity';
import { MessageEntity } from './entities/message.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

// import {JwtGuard} from "../auth/wsjwt.guard";
@UsePipes(ValidationPipe)
@WebSocketGateway()
export class ChatGateway
  implements
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnModuleInit {
  constructor(
    public readonly configService: ConfigService,
    public readonly usersService: UsersService,
    private _chatService: ChatService,
    private readonly redisService: RedisService,
    private authService: AuthService,
    private eventEmitter: EventEmitter2,
    @InjectRepository(RoomRepository)
    public readonly roomRepository: RoomRepository,
  ) {}
  // handleConnection(client: any, ...args: any[]) {
  //   throw new Error('Method not implemented.');
  // }

  // @Client({
  //     transport: Transport.REDIS, options: {
  //         url: 'redis://localhost:6379',
  //     }
  // })
  // redisClient: ClientProxy;

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    (<any>this.server).set(
      'authorization',
      socketioJwt.authorize({
        secret: process.env.JWT_SECRET_KEY,
        handshake: true,
      }),
    );
  }

  private logger: Logger = new Logger('AppGateway');

  // @UseGuards(WsAuthGuard)
  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: CreateMessageDto) {
    const createdMessage = await this._chatService.createMessage(
      payload,
      client.request.user,
    );
    this.logger.log(payload, 'msgToServer');
    const ans = { name: client.request.user.email, text: payload.text };
    const tt = await this.redisService
      .getClient()
      .get(`users:${client.request.user.id}`);
    // const tt = await this.redisService
    //   .getClient()
    //   .get(`users:${payload.receiver}`);
    if (tt) {
      this.server.emit('msgToClient', ans);
      this.server.to(createdMessage.room.name).emit('msgToClient', ans);
    }
  }

  @SubscribeMessage('createNewPublicRoom')
  async handleCreatePublicRoom(client: Socket, payload: CreateRoomDto) {
    const exists: RoomEntity = await this.roomRepository.findOne({
      where: { name: payload.name },
    });
    if (exists) {
      console.log('room exists already with this name');
      return;
    }
    const room: RoomEntity = await this.roomRepository.save({
      name: payload.name,
      isPrivate: false,
      members: [client.request.user],
    });
    client.join(room.name);

    const answerPayload = { name: room.name, text: 'new room created' };

    this.server.to(room.name).emit('createdNewPublicRoom', answerPayload);
  }

  // @SubscribeMessage('joinPublicRoom')
  // async handleJoinRoom(
  //   @ConnectedSocket() client: Socket,
  //   @MessageBody() payload: JoinRoomDto,
  // ) {
  //   const room: RoomEntity = await this.roomRepository.findOne(
  //     { name: payload.name },
  //     { relations: ['members'] },
  //   );
  //   if (!room) {
  //     console.log('room not found');
  //     return;
  //   }

  //   const isJoined = await this.roomRepository.join(room, client.request.user);
  //   if (!isJoined) {
  //     client.emit('not joined');
  //   }
  //   client.join(room.name);

  //   const answerPayload = {
  //     name: client.request.user.email,
  //     text: 'new user joined',
  //   };

  //   this.server.to(room.name).emit('userJoined', answerPayload);
  // }

  @SubscribeMessage('getRooms')
  async handleGetRooms(@ConnectedSocket() client: Socket) {
    if (client.request.user) {
      const memberId = client.request.user.id;
      const userRooms = await this.roomRepository
        .createQueryBuilder('rooms')
        .leftJoinAndSelect('rooms.members', 'members')
        .select('rooms.id', 'id')
        .where('members.id = :memberId', { memberId })
        .getRawMany();
      if (userRooms.length > 0) {
        const pvrooms = await this.roomRepository
          .createQueryBuilder('rooms')
          .innerJoinAndSelect('rooms.members', 'members')
          .innerJoinAndSelect('members.profile', 'profile')
          .innerJoinAndSelect('rooms.messages', 'messages')
          // .limit(2)
          .where('rooms.id IN (:...userRooms)', {
            userRooms: userRooms.map((r) => r.id),
          })
          .orderBy('rooms.createdAt', 'DESC')
          .orderBy('messages.createdAt', 'DESC')
          .getMany();
        client.emit('getRooms', await pvrooms.toDtos());
      }
    }
  }

  @SubscribeMessage('msgToRoomServer')
  async handleRoomMessage(client: Socket, payload: CreateMessageDto) {
    const room = await this.roomRepository.findOne({
      where: { name: payload.room_name, isPrivate: false },
      relations: ['members'],
    });

    if (!room) {
      this.logger.log('room not found');
      return;
    }
    const createdMessage = await this._chatService.createPublicRoomMessage(
      client.request.user,
      room,
      payload.text,
    );
    const answerPayload = {
      name: client.request.user.email,
      text: payload.text,
    };
    this.server
      .to(createdMessage.room.name)
      .emit('msgToRoomClient', answerPayload);
  }

  @SubscribeMessage('msgPrivateToServer')
  async handlePrivateMessage(client: Socket, payload: CreatePrivateMessageDto) {
    const receiver = await this.usersService.findOne(payload.receiver);
    if (!receiver) {
      console.log('receiver not found');
      return;
    }
    const createdMessage = await this._chatService.createPrivateMessage(
      client.request.user,
      receiver,
      payload.text,
    );
    this.eventEmitter.emit('message.created', {
      ...createdMessage,
      receiver,
      userId: createdMessage.sender.id,
    });
    const answerPayload = await this._chatService.findCreatedMsg(
      createdMessage.id,
    );

    const receiverSocketId: string = await this.redisService
      .getClient()
      .get(`users:${payload.receiver}`);

    // join two clients to room
    const receiverSocketObject = this.server.clients().sockets[
      receiverSocketId
    ];
    if (receiverSocketObject) {
      receiverSocketObject.join(createdMessage.room.name);
      client.join(createdMessage.room.name);
    }
    // if receiver is online
    if (receiverSocketId) {
      this.server
        .to(createdMessage.room.name)
        .emit('msgPrivateToClient', answerPayload);
    }
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  async handleDisconnect(client: Socket) {
    if (client.request?.user) {
      await this.redisService
        .getClient()
        .del(`users:${client.request.user.id}`);
      this.logger.log(`Client disconnected: ${client.id}`);
    }
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const user = await this.authService.loginSocket(client);
    // set on redis=> key: user.id,  value: socketId
    if (user) {
      await UtilsService.setUserIdAndSocketIdOnRedis(
        this.redisService,
        client.request.user.id,
        client.id,
      );
      // join to all user's room, so can get sent messages immediately
      this.roomRepository.initJoin(user, client);

      this.logger.log(`Client connected: ${client.id}`);
    }
  }

  @SubscribeMessage('createRoom')
  async createRoom(client: Socket, payload: CreateRoomDto) {
    const room = await this._chatService.createRoom(
      payload,
      client.request.user,
    );
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, payload: CreateRoomDto) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this._chatService.joinRoom(payload, client.request.user);
  }
}
