import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
// import { UserEntity } from './entities/user.entity';
// import { createQueryBuilder, Like, Repository } from 'typeorm';
import { ERROR_MESSAGES } from '@shared/ERROR_MESSAGES';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../auth/dto/login.dto';
import { CreateUserInput } from './dto/create-user.input';
import { ProfilesService } from '@users/profiles/profiles.service';
import { EmailsService } from '@users/emails/emails.service';
import {
  ACTIVE_USER_SUBJECT,
  ACTIVE_USER_TEMPLATE,
  CREATE_USER_SUBJECT,
  CREATE_USER_TEMPLATE,
  // CREATE_USER_SUBJECT,
  // CREATE_USER_TEMPLATE,
} from '@shared/emails';
import { PageMetaDto } from '@src/common/dto/page-meta.dto';
import { UsersPageDto } from './dto/users-page.dto';
import { UsersPageOptionsDto } from './dto/users-page-options.dto';
import { UserDto } from './dto/user.dto';
import { UtilsService } from '@src/providers/utils.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
    private profileService: ProfilesService,
    private emailService: EmailsService,
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
    const pw = await bcrypt.hash(password, 10);
    const createdProfile = await this.profileService.create(profile);
    const createdUser = await this.repo.create({
      ...createUserInputs,
      password: pw,
      profile: createdProfile,
    });
    const savedUser = await this.repo.save(createdUser);
    this.emailService.sendMail(
      CREATE_USER_TEMPLATE,
      savedUser.email,
      CREATE_USER_SUBJECT,
      {
        firstName: createdProfile?.firstName,
        lastName: createdProfile?.lastName,
      },
    );
    return await this.findOne(savedUser.id);
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
      where: {
        ...UtilsService.getOptions(pageOptionsDto),
        // active: true,
      },
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });
    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }

  async findMentorsByDomain(
    pageOptionsDto: UsersPageOptionsDto,
    domainId: string,
  ): Promise<UsersPageDto> {
    const joinUsers = this.repo
      .createQueryBuilder('users')
      .innerJoinAndSelect('users.role', 'role')
      .innerJoinAndSelect('role.permissions', 'permissions')
      .innerJoinAndSelect('users.profile', 'profile')
      .innerJoinAndSelect('profile.coachingDomains', 'coachingDomains');
    const whereDomain = domainId
      ? joinUsers.where('coachingDomains.id = :domainId', { domainId })
      : joinUsers;
    const whereStatus = pageOptionsDto.status
      ? whereDomain
        ? whereDomain.andWhere('users.status = :status', {
            status: pageOptionsDto.status,
          })
        : whereDomain.where('users.status = :status', {
            status: pageOptionsDto.status,
          })
      : whereDomain;
    const [users, usersCount] = await whereStatus
      .andWhere('users.active = :active', { active: true })
      .andWhere('role.name = :role', { role: 'mentor' })
      .skip(pageOptionsDto.take * (pageOptionsDto.page - 1))
      .take(pageOptionsDto.take)
      .getManyAndCount();

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });
    return new UsersPageDto(users.toDtos(), pageMetaDto);
  }

  async suggestMentors(
    pageOptionsDto: UsersPageOptionsDto,
    userId: string,
  ): Promise<UsersPageDto> {
    const mentee = await this.findOne(userId);
    if (mentee && mentee.profile.wantedDomain?.id) {
      const menteeDomainId = mentee.profile.wantedDomain?.id;
      let q = this.repo
        .createQueryBuilder('users')
        .innerJoinAndSelect('users.role', 'role')
        .innerJoinAndSelect('role.permissions', 'permissions')
        .innerJoinAndSelect('users.profile', 'profile')
        .innerJoinAndSelect('profile.coachingDomains', 'coachingDomains')
        .where('coachingDomains.id = :menteeDomainId', { menteeDomainId });
      q = pageOptionsDto.status
        ? q.andWhere('users.id = :status', { status })
        : q;
      const [users, usersCount] = await q
        // .andWhere('users.active = :active', { active: true })
        .andWhere('role.name = :role', { role: 'mentor' })
        .skip(pageOptionsDto.take * (pageOptionsDto.page - 1))
        .take(pageOptionsDto.take)
        .getManyAndCount();

      const pageMetaDto = new PageMetaDto({
        pageOptionsDto,
        itemCount: usersCount,
      });
      return new UsersPageDto(users.toDtos(), pageMetaDto);
    }
  }

  /**
   * Finds all users by RoleID related with (user role & role permissions)
   * @returns  {Array} of users info
   */
  async findByRole(
    roleId: string,
    pageOptionsDto: UsersPageOptionsDto,
  ): Promise<UsersPageDto> {
    const [users, usersCount] = await this.repo.findAndCount({
      relations: [
        'role',
        'role.permissions',
        'profile',
        'profile.coachingDomains',
        'profile.wantedDomain',
      ],
      where: { role: roleId },
      ...UtilsService.pagination(pageOptionsDto),
    });
    const pageMetaDto = new PageMetaDto({
      pageOptionsDto,
      itemCount: usersCount,
    });
    return new UsersPageDto(users.toDtos(), pageMetaDto);
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
    return user ? user.toDto() : null;
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
    return userWithRooms ? userWithRooms.toDto() : null;
  }

  /**
   * Updates user
   * @param {string} id of user
   * @param {UpdateUserInput} updateUserInput
   * @returns {object} user infos or exeption
   */
  async update(id: string, updateUserInput: UpdateUserInput): Promise<UserDto> {
    const { active } = updateUserInput;
    const user = await this.repo.findOne(id, {
      relations: ['profile'],
    });
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

    const updatedUser = await this.repo.create({ id, ...updateUserInput });
    return (await this.repo.save(updatedUser)).toDto();
  }

  /**
   * Updates user Password
   * @param {string} id of user
   * @param {string} password
   */
  async updatePassword(id: string, password: string) {
    const user = await this.repo.findOne(id, {
      relations: ['profile'],
    });
    if (!user) {
      throw new HttpException(
        ERROR_MESSAGES.NOT_EXISTED,
        HttpStatus.BAD_REQUEST,
      );
    }
    const pw = await bcrypt.hash(password, 10);
    const updatedUser = await this.repo.create({ id, password: pw });
    await this.repo.save(updatedUser);
    return true;
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
        ERROR_MESSAGES.NOT_ACTIVE,
        HttpStatus.NOT_ACCEPTABLE,
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
    return userByName ? userByName.toDto() : null;
  }
}
