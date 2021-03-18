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
      callbackURL: 'http://localhost:3000/api/v1/auth/linkedin/redirect',
      scope: ['r_emailaddress', 'r_liteprofile'],
    });
  }

  async validate(
    token,
    tokenSecret,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<any> {
    const { name, emails, provider, id, photos } = profile;
    console.log(profile);
    const user = {
      //   ...profile,
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
