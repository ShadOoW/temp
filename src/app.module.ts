import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { configService } from './config/config.service';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/guards/roles.guard';
import { CaslModule } from './casl/casl.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { SessionsModule } from './sessions/sessions.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

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
    AuthModule,
    ItemModule,
    CaslModule,
    PermissionsModule,
    RolesModule,
    UsersModule,
    RequestsModule,
    ProfilesModule,
    SubscriptionsModule,
    SessionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
