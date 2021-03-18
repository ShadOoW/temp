import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const { email, provider } = createUserInput;
    const user = await this.repo.findOne({ email });
    if (user) {
      if (provider === 'local')
        throw new HttpException(
          ERROR_MESSAGES.EXISTED_USER,
          HttpStatus.BAD_REQUEST,
        );
      else return CreateUserInput.fromEntity(user);
    }

    return this.repo
      .save(createUserInput)
      .then((e) => CreateUserInput.fromEntity(e));
  }

  async findAll() {
    return await this.repo
      .find({ relations: ['role', 'role.permissions'] })
      .then((users) => users.map((e) => CreateUserInput.fromEntity(e)));
  }

  async findOne(id: string) {
    return await this.repo
      .findOne(id)
      .then((user) => CreateUserInput.fromEntity(user));
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.repo.findOne({ id });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.EXISTED_USER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.repo
      .save(updateUserInput)
      .then((e) => CreateUserInput.fromEntity(e));
  }

  async remove(id: string) {
    const userToDelete = await this.findOne(id);
    if (!userToDelete) {
      throw new HttpException(
        ERROR_MESSAGES.UNAUTHORIZE,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.repo.delete(id);
    return userToDelete;
  }

  async findByLogin(userDTO: any): Promise<any> {
    const { email, password } = userDTO;
    const user = await this.repo.findOne({ email });

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      return CreateUserInput.fromEntity(user);
    } else {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async findByPayload(payload: any): Promise<any> {
    const { email } = payload;
    return await this.repo.findOne({ email });
  }
}
