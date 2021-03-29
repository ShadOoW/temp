import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from '../shared/ERROR_MESSAGES';
import * as bcrypt from 'bcrypt';
import { IPayload } from './interfaces/payload';
import { LoginDto } from '../auth/dto/login.dto';
import { IUser } from './interfaces/user';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  private getUser(userEntity: IUser): IUser {
    return {
      id: userEntity.id,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      username: userEntity.username,
      email: userEntity.email,
      phone: userEntity.phone,
      picture: userEntity.picture,
      role: {
        id: userEntity.role?.id,
        name: userEntity.role?.name,
        permissions: [
          ...userEntity.role?.permissions.map((permission) => ({
            id: permission.id,
            name: permission.name,
          })),
        ],
      },
    };
  }
  /**
   * Create new user
   * @param {CreateUserInput} createUserInput
   * @returns {object} user infos
   */
  async create(createUserInputs: CreateUserInput): Promise<IUser> {
    const { provider, password } = createUserInputs;
    const createUserDto = CreateUserInput.toEntity(createUserInputs);
    if (provider === 'local' && !password)
      throw new HttpException(
        ERROR_MESSAGES.PASSWORD_REQUIRED,
        HttpStatus.BAD_REQUEST,
      );
    return this.repo
      .save(createUserDto)
      .then(async (createdUser) =>
        this.getUser(await this.findOne(createdUser.id)),
      );
  }

  /**
   * Finds all users related with (user role & role permissions)
   * @returns  {Array} of users info
   */
  async findAll(): Promise<IUser[]> {
    return await this.repo
      .find({ relations: ['role', 'role.permissions'] })
      .then((users) => users.map((user) => this.getUser(user)));
  }

  /**
   * Finds one user
   * @param {string} id of user
   * @returns  {object} user infos
   */
  async findOne(id: string): Promise<IUser> {
    return await this.repo
      .findOne(id, { relations: ['role', 'role.permissions'] })
      .then((user) => this.getUser(user));
  }

  /**
   * Updates user
   * @param {string} id of user
   * @param {UpdateUserInput} updateUserInput
   * @returns {object} user infos or exeption
   */
  async update(id: string, updateUserInput: UpdateUserInput): Promise<IUser> {
    const user = await this.repo.findOne({ id });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const updateUserDto = UpdateUserInput.toEntity(updateUserInput);

    return this.repo.save(updateUserDto).then((user) => this.getUser(user));
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
    const { username, email, password } = loginDTO;
    const user = await this.repo.findOne({
      where: [{ email }, { username }],
      relations: ['role', 'role.permissions'],
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.getUser(user);
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
