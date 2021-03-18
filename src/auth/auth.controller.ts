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
import { CreateUserInput } from '../users/dto/create-user.input';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    const userDTO: CreateUserInput = req.user;
    const getUserDto = CreateUserInput.from(userDTO);
    const user = await this.usersService.create(getUserDto);
    const payload = {
      username: user.username,
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req): Promise<any> {
    const userDTO: CreateUserInput = req.user;
    const getUserDto = CreateUserInput.from(userDTO);
    const user = await this.usersService.create(getUserDto);
    const payload = {
      username: user.username,
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('linkedin/redirect')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLoginRedirect(@Req() req): Promise<any> {
    const userDTO: CreateUserInput = req.user;
    const getUserDto = CreateUserInput.from(userDTO);
    const user = await this.usersService.create(getUserDto);
    const payload = {
      username: user.username,
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(
    @Body() userDto: LoginDto,
  ): Promise<{ user: LoginDto; token: string }> {
    const user = await this.usersService.findByLogin(userDto);

    const payload = {
      username: user.username,
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(
    @Body() userDTO: CreateUserInput,
  ): Promise<{ user: LoginDto; token: string }> {
    const getUserDto = CreateUserInput.from(userDTO);
    const user = await this.usersService.create(getUserDto);
    const payload = {
      username: user.username,
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
