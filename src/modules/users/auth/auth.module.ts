import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '@users/users/users.module';
import { AuthController } from './auth.controller';
// import { GoogleStrategy } from './strategies/google.strategy';
// import { FacebookStrategy } from './strategies/facebook.strategy';
// import { LinkedinStrategy } from './strategies/linkedin.strategy';
import { UsersService } from '@users/users/users.service';
import { UserEntity } from '@users/users/entities/user.entity';
import { ProfilesService } from '@users/profiles/profiles.service';
import { Profile } from '@users/profiles/entities/profile.entity';
import { EmailsService } from '@users/emails/emails.service';
import { UsersRepository } from '@users/users/users.repository';

/**
 * Auth module import UsersModule to register user
 * Set JWT configuration
 * Add authenticitation strategies
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, UserEntity]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ProfilesService,
    EmailsService,
    UsersRepository,
  ],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
