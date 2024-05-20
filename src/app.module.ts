import './boilerplate.polyfill';
// import { ServeStaticModule } from '@nestjs/serve-static';
import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import REDIS_CONFIG from './shared/redis';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { configService } from './config/config.service';
import { AuthModule } from '@users/auth/auth.module';
import { CaslModule } from '@users/casl/casl.module';
import { PermissionsModule } from '@users/permissions/permissions.module';
import { RolesModule } from '@users/roles/roles.module';
import { UsersModule } from '@users/users/users.module';
import { RequestsModule } from '@users/requests/requests.module';
import { ProfilesModule } from '@users/profiles/profiles.module';
import { SubscriptionsModule } from '@users/subscriptions/subscriptions.module';
import { SessionsModule } from '@education/sessions/sessions.module';
import { JwtAuthGuard } from '@src/guards/jwt-auth.guard';
import { DomainsModule } from '@users/domains/domains.module';
import { EmailsModule } from '@users/emails/emails.module';
import { ChatModule } from '@src/modules/messaging/chat/chat.module';
import { RedisModule } from 'nestjs-redis';
import { EventsModule } from '@src/modules/events/events/events.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PubSub } from 'graphql-subscriptions';
import { PointsModule } from '@gamification/points/points.module';
import { BadgesModule } from '@gamification/badges/badges.module';
import { BalancesModule } from '@gamification/balances/balances.module';
import { QuizzesModule } from '@education/quizzes/quizzes.module';
import { QuizSolutionsModule } from '@src/modules/education/quizSolution/quizSolutions.module';
import { ObjectifModule } from '@education/objectifs/objectifs.module';
import { FilesModule } from '@documents/files/files.module';
import { FileTagsModule } from '@documents/file-tags/file-tags.module';

/**
 * AppModule support GraphQl code first with auto genetare schema file
 * Setup the Database base configutation with TypeOrmModule
 * Import internel Modules, and Global Guards
 */
@Global()
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      playground: false,
      debug: false,
      context: ({ req, connection }) =>
        connection ? { req: connection.context } : { req },
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    BullModule.forRoot({
      redis: REDIS_CONFIG,
    }),
    RedisModule.register({ url: 'redis://127.0.0.1:6379/0' }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'static'),
    //   exclude: ['/api*', '/graphql'],
    // }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    CaslModule,
    PermissionsModule,
    RolesModule,
    RequestsModule,
    ProfilesModule,
    SubscriptionsModule,
    SessionsModule,
    ObjectifModule,
    DomainsModule,
    EmailsModule,
    ChatModule,
    EventsModule,
    PointsModule,
    BadgesModule,
    BalancesModule,
    QuizzesModule,
    QuizSolutionsModule,
    FilesModule,
    FileTagsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
  exports: ['PUB_SUB'],
})
export class AppModule {}

