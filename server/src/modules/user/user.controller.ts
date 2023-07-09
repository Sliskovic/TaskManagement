import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  NotFoundException,
  Logger,
} from '@nestjs/common';

import { UserService } from './user.service';
import { AbstractUserController } from './abstract/abstract.user.controller';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { NotFound } from '../../common-exceptions/exceptions/notFound.exception';

@Controller('users')
export class UserController extends AbstractUserController {
  private readonly logger = new Logger(UserController.name);
  constructor(protected userService: UserService) {
    super(userService);
  }
  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    try {
      this.logger.log('Retrieving all users');
      const users = await this.userService.getAllUsers();
      if (users.length === 0) {
        throw new NotFoundException('No users found');
      }
      return await this.userService.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserEntity> {
    try {
      this.logger.log('Retrieving user with id: ' + id.toString());
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new NotFound(id);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userDto: UserDto,
  ): Promise<UserEntity> {
    try {
      this.logger.log('Updating user with id: ' + id.toString());
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new NotFound(id);
      }
      return this.userService.updateUser(id, userDto);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<string> {
    try {
      this.logger.log('Deleting user with id: ' + id.toString());
      const user = await this.userService.getUserById(id);
      if (!user) {
        throw new NotFound(id);
      }
      return this.userService.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}
