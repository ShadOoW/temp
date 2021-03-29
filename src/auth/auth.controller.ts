/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '../users/interfaces/user';
import { CreateUserInput } from '../users/dto/create-user.input';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Register user with local provider
   * @param {UserDto} userDTO
   * @returns {Object} user info with access token
   */
  @Post('register')
  async register(
    @Body() userDTO: CreateUserInput,
  ): Promise<{ user: IUser; token: string }> {
    return await this.authService.registerUser(userDTO);
  }

  /**
   * Authentication with google provider
   */
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<any> {
    return HttpStatus.OK;
  }

  /**
   * Google get callback
   * @param {Object} req
   * @returns {Object} user info with access token
   */
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req,
  ): Promise<{ user: IUser; token: string }> {
    const userDTO: CreateUserInput = req.user;
    return await this.authService.registerUser(userDTO);
  }

  /**
   * Authentication with facebook provider
   */
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  /**
   * Facebook get callback
   * @param {Object} req
   * @returns {Object} user info with access token
   */
  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(
    @Req() req,
  ): Promise<{ user: IUser; token: string }> {
    const userDTO: CreateUserInput = req.user;
    return await this.authService.registerUser(userDTO);
  }

  /**
   * Authentication with linkedin provider
   */
  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  /**
   * Linkedin get callback
   * @param {Object} req
   * @returns {Object} user info with access token
   */
  @Get('linkedin/redirect')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLoginRedirect(
    @Req() req,
  ): Promise<{ user: IUser; token: string }> {
    const userDTO: CreateUserInput = req.user;
    return await this.authService.registerUser(userDTO);
  }

  /**
   * Login with local provider
   * @param {LoginDto} userDto
   * @returns {User} user info with access token
   */
  @Post('login')
  async login(
    @Body() userDto: LoginDto,
  ): Promise<{ user: IUser; token: string }> {
    const user = await this.usersService.findByLogin(userDto);

    const payload = {
      username: user.username,
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
