import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from '../../shared/ERROR_MESSAGES';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../auth/dto/login.dto';
import { IUser } from './interfaces/user';
import { CreateUserInput } from './dto/create-user.input';
import { GetUserDto } from './dto/get-user.dto';
import { ProfilesService } from '../profiles/profiles.service';
import { EmailsService } from '../emails/emails.service';
import {
  ACTIVE_USER_SUBJECT,
  ACTIVE_USER_TEMPLATE,
  // CREATE_USER_SUBJECT,
  // CREATE_USER_TEMPLATE,
} from '../../shared/emails';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    private profileService: ProfilesService,
    private emailService: EmailsService = null,
  ) {}

  /**
   * Create new user
   * @param {CreateUserInput} createUserInput
   * @returns {object} user infos
   */
  async create(createUserInputs: CreateUserInput): Promise<IUser> {
    const { provider, password, profile } = createUserInputs;
    const createUserDto = await CreateUserInput.toEntity(createUserInputs);
    if (provider === 'local' && !password)
      throw new HttpException(
        ERROR_MESSAGES.PASSWORD_REQUIRED,
        HttpStatus.BAD_REQUEST,
      );
    const createdProfile = await this.profileService.create(profile);
    return this.repo
      .save({ ...createUserDto, profile: createdProfile })
      .then(async (createdUser) => {
        // this.emailService.sendMail(
        //   CREATE_USER_TEMPLATE,
        //   createdUser.email,
        //   CREATE_USER_SUBJECT,
        //   {
        //     firstName: createdUser.profile?.firstName,
        //     lastName: createdUser.profile?.lastName,
        //   },
        // );
        return GetUserDto.getUser(await this.findOne(createdUser.id));
      });
  }

  /**
   * Finds all users related with (user role & role permissions)
   * @returns  {Array} of users info
   */
  async findAll(): Promise<IUser[]> {
    return await this.repo
      .find({
        relations: [
          'role',
          'role.permissions',
          'profile',
          'profile.coachingDomains',
          'profile.wantedDomain',
        ],
      })
      .then((users) => users.map((user) => GetUserDto.getUser(user)));
  }

  /**
   * Finds all users by RoleID related with (user role & role permissions)
   * @returns  {Array} of users info
   */
  async findByRole(roleId: string): Promise<IUser[]> {
    return await this.repo
      .find({
        relations: ['role', 'role.permissions', 'profile'],
        where: { role: roleId },
      })
      .then((users) => users.map((user) => GetUserDto.getUser(user)));
  }

  /**
   * Finds one user
   * @param {string} id of user
   * @returns  {object} user infos
   */
  async getUserPermissions(id: string = null): Promise<any> {
    return await this.repo
      .findOne(id, {
        relations: ['role', 'role.permissions', 'profile'],
      })
      .then((user) => {
        return GetUserDto.getUserAuthInfo(user);
      });
  }

  /**
   * Finds one user
   * @param {string} id of user
   * @returns  {object} user infos
   */
  async findOne(id: string = null): Promise<any> {
    return await this.repo
      .findOne(id, {
        relations: [
          'role',
          'role.permissions',
          'profile',
          'profile.coachingDomains',
          'profile.wantedDomain',
        ],
      })
      .then((user) => {
        return GetUserDto.getUser(user);
      });
  }

  /**
   * Finds user Requests
   * @param {string} id of user
   * @returns  {object} user infos
   */
  async findUserRequests(id: string): Promise<any> {
    return await this.repo
      .findOne(id, {
        relations: ['requestsTo', 'requestsFrom'],
      })
      .then((user) => user);
  }

  /**
   * Finds user Requests
   * @param {string} id of user
   * @returns  {object} user infos
   */
  async findUserRooms(id: string): Promise<any> {
    return await this.repo
      .findOne(id, {
        relations: ['rooms'],
      })
      .then((user) => user);
  }
  /**
   * Updates user
   * @param {string} id of user
   * @param {UpdateUserInput} updateUserInput
   * @returns {object} user infos or exeption
   */
  async update(id: string, updateUserInput: UpdateUserInput): Promise<IUser> {
    const { active } = updateUserInput;
    const user = await this.repo.findOne(
      { id },
      {
        relations: ['profile'],
      },
    );
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    if (active && !user.active) {
      this.emailService.sendMail(
        ACTIVE_USER_TEMPLATE,
        user.email,
        ACTIVE_USER_SUBJECT,
        {
          firstName: user.profile?.firstName,
          lastName: user.profile?.lastName,
        },
      );
    }
    return this.repo
      .save({ id, ...updateUserInput })
      .then((user) => GetUserDto.getUser(user));
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
      where: [
        { email, active: true },
        { email, isAdmin: true },
        { username, active: true },
      ],
      relations: [
        'role',
        'role.permissions',
        'profile',
        'profile.coachingDomains',
        'profile.wantedDomain',
      ],
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      return GetUserDto.getUser(user);
    } else {
      throw new HttpException(
        ERROR_MESSAGES.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * Finds user by email or username
   * @param {LoginDto} userDTO
   * @returns {object} user info or exeption
   */
  async findByUserName(loginDTO: LoginDto): Promise<any> {
    const { email } = loginDTO;
    return await this.repo.findOne({
      where: [{ email }],
    });
  }
}
