import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
// import { UserEntity } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { PoliciesGuard } from '@src/guards/check-policies.guard';
// import { AppAbility } from '@users/casl/casl-ability.factory';
// import { CheckPolicies } from '@src/decorators/check-policies.decorator';
// import { Actions } from '@shared/actions';
import { Public } from '@shared/public.decorator';
import { UserDto } from './dto/user.dto';
import { UsersPageOptionsDto } from './dto/users-page-options.dto';
import { UsersPageDto } from './dto/users-page.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailsService } from '../emails/emails.service';
import {
  RESET_PASSWORD_SUBJECT,
  RESET_PASSWORD_TEMPLATE,
} from '@shared/emails';
import { User as CurrentUser } from '@src/decorators/user.decorator';
import { ERROR_MESSAGES } from '@src/shared/ERROR_MESSAGES';
import { CheckPolicies } from '@src/decorators/check-policies.decorator';
import { AppAbility } from '../casl/casl-ability.factory';
import { Actions } from '@src/shared/actions';
import { UserEntity } from './entities/user.entity';

@Resolver(() => UserDto)
@UseGuards(PoliciesGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailsService,
  ) {}

  @Public()
  @Query(() => Boolean, { name: 'emailExists' })
  async emailExists(@Args('email', { type: () => String }) email: string) {
    return !!(await this.usersService.findByUserName({ email }));
  }

  @Public()
  @Mutation(() => Boolean, { name: 'forgetPassword' })
  async forgetPassword(@Args('email', { type: () => String }) email: string) {
    const existUser = await this.usersService.findByUserName({ email });
    if (existUser) {
      const payload = {
        email: existUser.email,
        sub: existUser.id,
      };
      await this.emailService.sendMail(
        RESET_PASSWORD_TEMPLATE,
        email,
        RESET_PASSWORD_SUBJECT,
        {
          link: `${
            process.env.HOST
          }/platform/auth/reset-password?token=${this.jwtService.sign(payload)}`,
        },
      );
    }
    return true;
    // else {
    //   throw new HttpException(
    //     ERROR_MESSAGES.NOT_EXISTED,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
  }

  @Query(() => Boolean, { name: 'passwordIsCorrect' })
  async passwordIsCorrect(
    @Args('password', { type: () => String }) password: string,
    @CurrentUser() user,
  ) {
    return !!(await this.usersService.checkUserPassword(user.id, password));
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Args('password', { type: () => String }) password: string,
    @CurrentUser() user,
  ): Promise<boolean> {
    if (user.id)
      return await this.usersService.updatePassword(user.id, password);
  }
  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Manage, UserEntity),
  )
  @Mutation(() => UserDto)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<UserDto> {
    return await this.usersService.create(createUserInput);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => UsersPageDto, { name: 'users' })
  findAll(@Args() pageOptionsDto: UsersPageOptionsDto) {
    return this.usersService.findAll(pageOptionsDto);
  }

  @Query(() => UsersPageDto, { name: 'deletedUsers' })
  findAllDelete(@Args() pageOptionsDto: UsersPageOptionsDto) {
    return this.usersService.findAllDelete(pageOptionsDto);
  }

  @Query(() => UsersPageDto, { name: 'suggestMentors' })
  suggestMentors(
    @Args() pageOptionsDto: UsersPageOptionsDto,
    @CurrentUser() user,
  ) {
    return this.usersService.suggestMentors(pageOptionsDto, user.id);
  }

  @Query(() => UsersPageDto, { name: 'mentorsByDomain' })
  findByDomain(
    @Args() pageOptionsDto: UsersPageOptionsDto,
    @Args('domainId', { type: () => String, nullable: true }) domainId: string,
  ) {
    return this.usersService.findMentorsByDomain(pageOptionsDto, domainId);
  }

  @CheckPolicies((ability: AppAbility) =>
    ability.can(Actions.Manage, UserEntity),
  )
  @Query(() => UsersPageDto, { name: 'usersByRole' })
  findByRole(
    @Args() pageOptionsDto: UsersPageOptionsDto,
    @Args('role', { type: () => String }) role: string,
  ) {
    return this.usersService.findByRole(role, pageOptionsDto);
  }

  // @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => UserDto, { name: 'userRequests' })
  findUserRequests(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findUserRequests(id);
  }

  // @CheckPolicies((ability: AppAbility) => ability.can(Actions.Read, UserEntity))
  @Query(() => UserDto, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Actions.Update, UserEntity),
  // )
  @Mutation(() => UserDto)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  // @CheckPolicies((ability: AppAbility) =>
  //   ability.can(Actions.Delete, UserEntity),
  // )
  @Mutation(() => UserDto)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.remove(id);
  }
}

