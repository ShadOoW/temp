import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { IPayload } from '../users/interfaces/payload';
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
  async validateUser(payload: IPayload): Promise<any> {
    return await this.usersService.findByPayload(payload);
  }

  /**
   * Create user from Userservice
   * @param {CreateUserInput} userDTO
   * @returns {(User,string)} user info with access token
   */
  async registerUser(
    userDTO: CreateUserInput,
  ): Promise<{ user: any; token: string }> {
    const getUserDto = CreateUserInput.from(userDTO);
    const user = await this.usersService.create(getUserDto);
    const payload = {
      username: user.username,
      email: user.email,
    };
    const token = await this.signPayload(payload);
    return { user, token };
  }
}
