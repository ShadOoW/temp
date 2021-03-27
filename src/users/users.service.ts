import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import * as bcrypt from 'bcrypt';
import { IPayload } from './interfaces/payload';
import { LoginDto } from '../auth/dto/login.dto';
import { IUser } from './interfaces/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  /**
   * Create new user
   * @param {UserDto} createUserInput
   * @returns {object} user infos
   */
  async create(createUserInputs: UserDto): Promise<IUser> {
    const { email, provider } = createUserInputs;
    const createUserDto = UserDto.toEntity(createUserInputs);
    const user = await this.repo.findOne({ email });
    if (user) {
      if (provider === 'local')
        throw new HttpException(
          ERROR_MESSAGES.EXISTED_USER,
          HttpStatus.BAD_REQUEST,
        );
      else return UserDto.fromEntity(user);
    }

    return this.repo.save(createUserDto).then((e) => UserDto.fromEntity(e));
  }

  /**
   * Finds all users related with (user role & role permissions)
   * @returns  {Array} of users info
   */
  async findAll(): Promise<IUser[]> {
    return await this.repo
      .find({ relations: ['role', 'role.permissions'] })
      .then((users) => users.map((e) => UserDto.fromEntity(e)));
  }

  /**
   * Finds one user
   * @param {string} id of user
   * @returns  {object} user infos
   */
  async findOne(id: string): Promise<IUser> {
    return await this.repo.findOne(id).then((user) => UserDto.fromEntity(user));
  }

  /**
   * Updates user
   * @param {string} id of user
   * @param {UpdateUserInput} updateUserInput
   * @returns {object} user infos or exeption
   */
  async update(id: string, updateUserInput: UserDto): Promise<IUser> {
    const user = await this.repo.findOne({ id });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.EXISTED_USER,
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.repo.save(updateUserInput).then((e) => UserDto.fromEntity(e));
  }

  /**
   * Removes user
   * @param {string} id of user
   * @returns {object} removed user data or exeption
   */
  async remove(id: string): Promise<IUser> {
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

  /**
   * Finds user by email and password
   * @param {LoginDto} userDTO
   * @returns {object} user info or exeption
   */
  async findByLogin(loginDTO: LoginDto): Promise<IUser> {
    const { email, password } = loginDTO;
    const user = await this.repo.findOne({ email });

    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      return UserDto.fromEntity(user);
    } else {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * Finds by payload
   * @param {IPayload} payload
   * @returns {User} user data
   */
  async findByPayload(payload: IPayload): Promise<IUser> {
    const { email, username } = payload;
    return await this.repo.findOne({
      where: [{ email }, { username }],
    });
  }
}
