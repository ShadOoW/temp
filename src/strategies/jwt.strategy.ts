import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { AuthService } from '../modules/users/auth/auth.service';
import { IPayload } from '@users/users/interfaces/payload';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  /**
   * Validate JWT strategy
   * @returns {User} user infos
   */
  async validate(
    payload: IPayload,
    done: VerifiedCallback,
  ): Promise<void | VerifiedCallback> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(
        new HttpException(ERROR_MESSAGES.UNAUTHORIZE, HttpStatus.UNAUTHORIZED),
        false,
      );
    }
    return done(null, user, payload.iat);
  }
}
