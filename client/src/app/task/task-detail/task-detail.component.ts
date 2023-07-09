import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';

import { TaskService } from '../task.service';
import { Priority, Status, TaskDto } from '../dto/task.interface';
import { LoggerService } from 'src/app/shared/logging.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent {
  taskForm!: FormGroup;
  task!: TaskDto;

  priorityValues: string[] = Object.values(Priority);
  statusValues: string[] = Object.values(Status);
  isEditMode: boolean = false;
  isFormEditable: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private logger: LoggerService
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadTaskDetails();
  }

  toggleEditMode(): void {
    if (this.isEditMode) {
      const updatedTask: TaskDto = this.taskForm.value;
      this.updateTask(this.task.id, updatedTask);
    }
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.taskForm.enable();
    } else {
      this.taskForm.disable();
    }
  }

  loadTaskDetails(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    const observer: Observer<TaskDto> = {
      next: (task: TaskDto) => {
        this.task = task;
        this.setFormValues();
      },
      error: (error) => {
        this.notificationService.showClientError(
          'Error fetching task:',
          error.message
        );
        this.logger.log('Error fetching task:', error);
      },
      complete: () => {
        this.logger.log('Task observable is now completed.');
      },
    };
    this.taskService.getTaskbyId(Number(taskId)).subscribe(observer);
  }

  updateTask(taskId: number, updatedTask: TaskDto) {
    const observer: Observer<TaskDto> = {
      next: () => {
        this.notificationService.showInfo('Task updated successfully');
      },
      error: (error) => {
        this.notificationService.showClientError(
          'Error updating task:',
          error.message
        );
        this.logger.log('Error updating task:', error);
      },
      complete: () => {
        this.logger.log('Task observable is now completed.');
      },
    };
    this.taskService.updateTask(taskId, updatedTask).subscribe(observer);
  }

  deleteTask() {
    const confirmation = confirm('Are you sure you want to delete this task?');
    if (confirmation) {
      console.log('Task Id:', this.task.id);
      const observer: Observer<string> = {
        next: () => {
          this.notificationService.showInfo('Task deleted successfully');
          this.router.navigate(['/task']);
        },
        error: (error) => {
          this.logger.log('Error deleting task:', error);
        },
        complete: () => {
          this.logger.log('Task observable is now completed.');
        },
      };
      this.taskService.deleteTask(this.task.id).subscribe(observer);
    }
  }

  goToTaskList(): void {
    this.router.navigate(['/task']);
  }

  private createForm() {
    return (this.taskForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      description: [{ value: '', disabled: true }, Validators.required],
      priority: [{ value: Priority.LOW, disabled: true }, Validators.required],
      status: [
        { value: Status.PROJECTED, disabled: true },
        Validators.required,
      ],
    }));
  }

  private setFormValues() {
    this.taskForm.setValue({
      name: this.task.name,
      description: this.task.description,
      priority: this.task.priority,
      status: this.task.status,
    });
  }
}
