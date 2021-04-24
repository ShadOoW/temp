// import { ServeStaticModule } from '@nestjs/serve-static';
import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import REDIS_CONFIG from './shared/redis';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { configService } from './config/config.service';
import { AuthModule } from './users-micro/auth/auth.module';
import { CaslModule } from './users-micro/casl/casl.module';
import { PermissionsModule } from './users-micro/permissions/permissions.module';
import { RolesModule } from './users-micro/roles/roles.module';
import { UsersModule } from './users-micro/users/users.module';
import { RequestsModule } from './users-micro/requests/requests.module';
import { ProfilesModule } from './users-micro/profiles/profiles.module';
import { SubscriptionsModule } from './users-micro/subscriptions/subscriptions.module';
import { SessionsModule } from './education-micro/sessions/sessions.module';
import { JwtAuthGuard } from './users-micro/auth/guards/jwt-auth.guard';
import { DomainsModule } from './users-micro/domains/domains.module';
import { EmailsModule } from './users-micro/emails/emails.module';
import { ChatModule } from './messaging-micro/chat/chat.module';
import { RedisModule } from 'nestjs-redis';
import { EventsModule } from './events-micro/events/events.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PubSub } from 'graphql-subscriptions';
import { PointsModule } from './gamification-micro/points/points.module';
import { BadgesModule } from './gamification-micro/badges/badges.module';
import { BalancesModule } from './gamification-micro/balances/balances.module';
import { QuestionsModule } from './education-micro/questions/questions.module';
import { QuizzesModule } from './education-micro/quizzes/quizzes.module';
import { EvaluationsModule } from './education-micro/evaluations/evaluations.module';

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
    DomainsModule,
    EmailsModule,
    ChatModule,
    EventsModule,
    PointsModule,
    BadgesModule,
    BalancesModule,
    QuestionsModule,
    QuizzesModule,
    EvaluationsModule,
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
