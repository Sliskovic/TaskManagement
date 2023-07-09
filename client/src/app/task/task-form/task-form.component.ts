import { Component, Input, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() taskForm!: FormGroup;
  @Input() priorityValues: string[] = [];
  @Input() statusValues: string[] = [];

  constructor(private formBuilder: FormBuilder) {}

  createForm() {
    return this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
}
