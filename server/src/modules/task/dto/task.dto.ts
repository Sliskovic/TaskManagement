import { IsNotEmpty, IsString } from 'class-validator';

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export enum Status {
  CLOSED = 'Closed',
  INPROCESS = 'In Process',
  PROJECTED = 'Projected',
}

export class TaskDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  priority: string;

  status: string;
}
