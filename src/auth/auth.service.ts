import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { IPayload } from '../users/interfaces/payload';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signPayload(payload: IPayload): Promise<any> {
    return sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
  }

  async validateUser(payload: IPayload): Promise<any> {
    return await this.userService.findByPayload(payload);
  }
}
