import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { UserEntity } from './entities/user.entity';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {}
