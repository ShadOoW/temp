import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '@users/users/users.service';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import { CreateUserInput } from '@users/users/dto/create-user.input';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Generate token with sign of JWT
   * @param {IPayload} payload
   * @returns {string} token
   */
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * Validate user by check if exists
   * @param {IPayload} payload
   * @returns {User} user
   */
  async validateUser(payload: LoginDto): Promise<any> {
    return await this.usersService.findByLogin(payload);
  }

  /**
   * Create user from Userservice
   * @param {UserDto} userDTO
   * @returns {(User,string)} user info with access token
   */
  async registerUser(registerUserInputs: CreateUserInput) {
    const { provider } = registerUserInputs;
    delete registerUserInputs.isAdmin;
    delete registerUserInputs.active;
    const findUser = await this.usersService.findByUserName(registerUserInputs);
    if (findUser) {
      if (provider === 'local')
        throw new HttpException(ERROR_MESSAGES.EXISTED, HttpStatus.BAD_REQUEST);
    }
    return this.usersService.create(registerUserInputs);
  }

  /*
   * login user on socket, set user on client request
   * */
  async loginSocket(client: Socket): Promise<UserDto> {
    const { iat, exp, sub: userId } = client.request.decoded_token;
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
      // return false;
    }
    const user = await this.usersService.findUserRooms(userId);
    if (!user) {
      // throw new UnauthorizedException();
      return;
    }

    // set user on client request for another handlers to get authenticated user.
    client.request.user = user;
    return user;
  }
}

