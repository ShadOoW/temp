import { ServeStaticModule } from '@nestjs/serve-static';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import REDIS_CONFIG from './shared/redis';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { configService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SessionsModule } from './sessions/sessions.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DomainsModule } from './domains/domains.module';
import { EmailsModule } from './emails/emails.module';
import { ChatModule } from './chat/chat.module';
import { RedisModule } from 'nestjs-redis';

/**
 * AppModule support GraphQl code first with auto genetare schema file
 * Setup the Database base configutation with TypeOrmModule
 * Import internel Modules, and Global Guards
 */
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    BullModule.forRoot({
      redis: REDIS_CONFIG,
    }),
    RedisModule.register({ url: 'redis://127.0.0.1:6379/0' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    AuthModule,
    UsersModule,
    CaslModule,
    PermissionsModule,
    RolesModule,
    RequestsModule,
    ProfilesModule,
    SubscriptionsModule,
    SessionsModule,
    DomainsModule,
    EmailsModule,
    ChatModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
