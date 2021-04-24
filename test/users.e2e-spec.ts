import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from '../src/users-micro/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../src/config/config.service';
// import { Repository } from 'typeorm';
// import { User } from '../models/User.entity';
// import { CreateUserDto } from './dto/create-user.dto';

describe('GET / users', () => {
  let app: INestApplication;
  // let repository: Repository<User>;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UsersModule,
        // Use the e2e_test database to run the tests
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
      ],
    }).compile();
    app = module.createNestApplication();
    // app.setGlobalPrefix('api/v1');
    await app.init();
    // repository = module.get('UserRepository');
  });

  it('should return an array of users', async () => {
    // Run your end-to-end test
    // const { body } =
    await request
      .agent(app.getHttpServer())
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  afterEach(async () => {
    // await repository.query(`TRUNCATE TABLE public."user" CASCADE`);
    await app.close();
  });
});
