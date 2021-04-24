// import { ServeStaticModule } from '@nestjs/serve-static';
import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import REDIS_CONFIG from './shared/redis';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { configService } from './config/config.service';
import { AuthModule } from './users-service/auth/auth.module';
import { CaslModule } from './users-service/casl/casl.module';
import { PermissionsModule } from './users-service/permissions/permissions.module';
import { RolesModule } from './users-service/roles/roles.module';
import { UsersModule } from './users-service/users/users.module';
import { RequestsModule } from './users-service/requests/requests.module';
import { ProfilesModule } from './users-service/profiles/profiles.module';
import { SubscriptionsModule } from './users-service/subscriptions/subscriptions.module';
import { SessionsModule } from './course-service/sessions/sessions.module';
import { JwtAuthGuard } from './users-service/auth/guards/jwt-auth.guard';
import { DomainsModule } from './users-service/domains/domains.module';
import { EmailsModule } from './users-service/emails/emails.module';
import { ChatModule } from './contact-service/chat/chat.module';
import { RedisModule } from 'nestjs-redis';
import { EventsModule } from './events-service/events/events.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PubSub } from 'graphql-subscriptions';
import { PointsModule } from './game-service/points/points.module';
import { BadgesModule } from './game-service/badges/badges.module';
import { BalancesModule } from './game-service/balances/balances.module';
import { QuestionsModule } from './course-service/questions/questions.module';
import { QuizzesModule } from './course-service/quizzes/quizzes.module';
import { EvaluationsModule } from './course-service/evaluations/evaluations.module';

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
