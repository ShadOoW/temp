import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import { CreateUserInput } from '../users/dto/create-user.input';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

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
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
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
    const findUser = await this.usersService.findByLogin(registerUserInputs);
    if (findUser) {
      if (provider === 'local')
        throw new HttpException(ERROR_MESSAGES.EXISTED, HttpStatus.BAD_REQUEST);
    }
    return this.usersService.create(registerUserInputs);
  }
}
