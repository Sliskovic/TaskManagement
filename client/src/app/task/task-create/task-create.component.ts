import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Priority, Status, TaskDto } from '../dto/task.interface';
import { TaskService } from '../task.service';
import { LoggerService } from 'src/app/shared/logging.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
})
export class TaskCreateComponent {
  taskForm!: FormGroup;
  priorityValues: string[] = Object.values(Priority);
  statusValues: string[] = Object.values(Status);

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private notificationService: NotificationService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createTask(): void {
    if (this.taskForm.invalid) {
      return;
    }
    const newTask: TaskDto = this.taskForm.value;
    const observer = {
      next: (createdTask: TaskDto) => {
        this.logger.log('Task created:', createdTask);
        this.notificationService.showInfo('Task created!');
      },
      error: (error: any) => {
        this.logger.log('Error creating task:', error);
      },
    };
    this.taskService.createTask(newTask).subscribe(observer);
  }

  private createForm() {
    return (this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: [Priority.LOW, Validators.required],
      status: [Status.PROJECTED, Validators.required],
    }));
  }
}
