import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { IPayload } from '../users/interfaces/payload';
import { IUser } from 'src/users/interfaces/user';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import { CreateUserInput } from '../users/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * Generate token with sign of JWT
   * @param {IPayload} payload
   * @returns {string} token
   */
  async signPayload(payload: IPayload): Promise<any> {
    return sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  /**
   * Validate user by check if exists
   * @param {IPayload} payload
   * @returns {User} user
   */
  async validateUser(payload: IPayload): Promise<IUser> {
    return await this.usersService.findByPayload(payload);
  }

  /**
   * Create user from Userservice
   * @param {UserDto} userDTO
   * @returns {(User,string)} user info with access token
   */
  async registerUser(
    registerUserInputs: CreateUserInput,
  ): Promise<{ user: IUser; token: string }> {
    const { provider } = registerUserInputs;
    const createUserDto = CreateUserInput.toEntity(registerUserInputs);
    const findUser = await this.usersService.findByPayload(createUserDto);
    if (findUser) {
      if (provider === 'local')
        throw new HttpException(ERROR_MESSAGES.EXISTED, HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.create(createUserDto);
    const payload = {
      username: user.username,
      email: user.email,
    };
    const token = await this.signPayload(payload);
    return { user, token };
  }
}
