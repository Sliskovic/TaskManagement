import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './dto/task.dto';
import { TaskEntity } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(taskDto: TaskDto): Promise<TaskEntity> {
    const { name, description, priority, status } = taskDto;
    const newTask = new TaskEntity();
    newTask.name = name;
    newTask.description = description;
    newTask.priority = priority;
    newTask.status = status;
    return this.taskRepository.save(newTask);
  }

  async updateTask(id: number, taskDto: TaskDto): Promise<TaskEntity> {
    const task = await this.taskRepository.findOneOrFail({ where: { id } });
    task.name = taskDto.name;
    task.description = taskDto.description;
    task.priority = taskDto.priority;
    task.status = taskDto.status;

    return await this.taskRepository.save(task);
  }

  async getAllTasks(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    return this.taskRepository.findOne({ where: { id } });
  }
  async deleteTask(id: number): Promise<string> {
    await this.taskRepository.delete({ id });
    return 'Task deleted successfully!';
  }
}
