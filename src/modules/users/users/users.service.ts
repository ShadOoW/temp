import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../auth/dto/login.dto';
import { CreateUserInput } from './dto/create-user.input';
import { ProfilesService } from '@users/profiles/profiles.service';
import { EmailsService } from '@users/emails/emails.service';
import {
  ACTIVE_USER_SUBJECT,
  ACTIVE_USER_TEMPLATE,
  // CREATE_USER_SUBJECT,
  // CREATE_USER_TEMPLATE,
} from '@shared/emails';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UsersPageDto } from './dto/users-page.dto';
import { UsersPageOptionsDto } from './dto/users-page-options.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
    private profileService: ProfilesService,
    private emailService: EmailsService = null,
  ) {}

  /**
   * Create new user
   * @param {CreateUserInput} createUserInput
   * @returns {object} user infos
   */
  async create(createUserInputs: CreateUserInput): Promise<UserDto> {
    const { provider, password, profile } = createUserInputs;
    if (provider === 'local' && !password)
      throw new HttpException(
        ERROR_MESSAGES.PASSWORD_REQUIRED,
        HttpStatus.BAD_REQUEST,
      );
    const createdProfile = await this.profileService.create(profile);
    const createdUser = await this.repo.save({
      ...createUserInputs,
      profile: createdProfile,
    });
    return createdUser.toDto();
  }

  /**
   * Finds all users related with (user role & role permissions)
   * @returns  {Array} of users info
   */
  async findAll(pageOptionsDto: UsersPageOptionsDto): Promise<UsersPageDto> {
    const [users, usersCount] = await this.repo.findAndCount({
      relations: [
        'role',
        'role.permissions',
        'profile',
        'profile.coachingDomains',
        'profile.wantedDomain',
      ],
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });
    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }

  /**
   * Finds all users by RoleID related with (user role & role permissions)
   * @returns  {Array} of users info
   */
  async findByRole(roleId: string): Promise<UserDto[]> {
    const usersByRole = await this.repo.find({
      relations: ['role', 'role.permissions', 'profile'],
      where: { role: roleId },
    });
    return usersByRole.toDtos();
  }

  /**
   * Finds one user
   * @param {string} id of user
   * @returns  {object} user infos
   */
  async getUserPermissions(id: string = null): Promise<UserDto> {
    const userWithPermissions = await this.repo.findOne(id, {
      relations: ['role', 'role.permissions', 'profile'],
    });
    return userWithPermissions.toDto();
  }

  /**
   * Finds one user
   * @param {string} id of user
   * @returns  {object} user infos
   */
  async findOne(id: string): Promise<UserDto> {
    const user = await this.repo.findOne(id, {
      relations: [
        'role',
        'role.permissions',
        'profile',
        'profile.coachingDomains',
        'profile.wantedDomain',
      ],
    });
    return user.toDto();
  }

  /**
   * Finds user Requests
   * @param {string} id of user
   * @returns  {object} user infos
   */
  async findUserRequests(id: string): Promise<any> {
    const userWithRequests = await this.repo
      .findOne(id, {
        relations: ['requestsTo', 'requestsFrom'],
      })
      .then((user) => user);
    return userWithRequests.toDto();
  }

  /**
   * Finds user Requests
   * @param {string} id of user
   * @returns  {object} user infos
   */
  async findUserRooms(id: string): Promise<UserDto> {
    const userWithRooms = await this.repo
      .findOne(id, {
        relations: ['rooms'],
      })
      .then((user) => user);
    return userWithRooms.toDto();
  }
  /**
   * Updates user
   * @param {string} id of user
   * @param {UpdateUserInput} updateUserInput
   * @returns {object} user infos or exeption
   */
  async update(id: string, updateUserInput: UpdateUserInput): Promise<UserDto> {
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
    const updatedUser = await this.repo.save({ id, ...updateUserInput });
    return updatedUser.toDto();
  }

  /**
   * Removes user
   * @param {string} id of user
   * @returns {object} removed user data or exeption
   */
  async remove(id: string): Promise<UserDto> {
    const userToDelete = await this.repo.findOne(id);
    if (!userToDelete) {
      throw new HttpException(
        ERROR_MESSAGES.UNAUTHORIZE,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.repo.delete(id);
    return userToDelete.toDto();
  }

  /**
   * Finds user by email and password
   * @param {LoginDto} userDTO
   * @returns {object} user info or exeption
   */
  async findByLogin(loginDTO: LoginDto): Promise<UserDto> {
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
      return user.toDto();
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
  async findByUserName(loginDTO: LoginDto): Promise<UserDto> {
    const { email } = loginDTO;
    const userByName = await this.repo.findOne({
      where: [{ email }],
    });
    return userByName.toDto();
  }
}