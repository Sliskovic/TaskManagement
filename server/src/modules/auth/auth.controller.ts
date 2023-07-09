import {
  Body,
  ConflictException,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { Public } from './public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';
import { Roles } from './roles.decorator';
import { Role } from '../user/entity/user.entity';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Public()
  @Post('sing-up')
  async signUp(@Body() userDto: UserDto) {
    try {
      this.logger.log('Registering a new user');
      return await this.userService.createUser(userDto);
    } catch (error) {
      throw new ConflictException('Email already exists');
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  @Roles(Role.ADMIN)
  async signIn(@Body() signInDto: SignInDto) {
    try {
      this.logger.log('Logging in a user');
      return await this.authService.signIn(signInDto);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
