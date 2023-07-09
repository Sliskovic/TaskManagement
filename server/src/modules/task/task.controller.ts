import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Logger,
  NotFoundException,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TaskEntity } from './entity/task.entity';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks(): Promise<TaskEntity[]> {
    try {
      this.logger.log('Retrieving all tasks');
      const tasks = await this.taskService.getAllTasks();
      if (tasks.length === 0) {
        throw new NotFoundException('No tasks found');
      }
      return await this.taskService.getAllTasks();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<TaskEntity> {
    try {
      this.logger.log(`Retrieving task with ID: ${id}`);
      const task = await this.taskService.getTaskById(id);
      if (!task) {
        throw new NotFoundException(`Task with ID: ${id} not found`);
      }
      return task;
    } catch (error) {
      throw error;
    }
  }

  @Post('create')
  async createTask(@Body() taskDto: TaskDto): Promise<TaskEntity> {
    try {
      this.logger.log('Creating a new task');
      return await this.taskService.createTask(taskDto);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() taskDto: TaskDto,
  ): Promise<TaskEntity> {
    try {
      this.logger.log(`Updating task with ID: ${id}`);
      const task = await this.taskService.updateTask(id, taskDto);
      if (!task) {
        throw new NotFoundException(`Task with ID: ${id} not found`);
      }
      return task;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<string> {
    // await this.taskService.deleteTask(id);
    // return 'Task deleted successfully!';
    try {
      this.logger.log(`Deleting task with ID: ${id}`);
      const message = await this.taskService.deleteTask(id);
      if (!message) {
        throw new NotFoundException(`Task with ID: ${id} not found`);
      }
      return message;
    } catch (error) {
      throw error;
    }
  }
}
