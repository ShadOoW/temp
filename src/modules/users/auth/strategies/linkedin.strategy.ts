import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-linkedin-oauth2';
import { config } from 'dotenv';

config();

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_APP_ID,
      clientSecret: process.env.LINKEDIN_APP_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK,
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }
  /**
   * Validate linkedin strategy
   * @returns {User} linkedin user infos
   */
  async validate(
    token,
    tokenSecret,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, provider, id, photos } = profile;
    const user = {
      providerId: id,
      provider,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
    };
    done(null, user);
  }
}
