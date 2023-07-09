import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';

import { UserDto } from '../dto/singup.interface';
import { AuthService } from '../auth.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { LoggerService } from 'src/app/shared/logging.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private logger: LoggerService
  ) {
    this.createForm();
  }
  ngOnInit(): void {}
  createForm() {
    return this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    const singupFormData: UserDto = this.registerForm.value;
    const observer: Observer<UserDto> = {
      next: (response: UserDto) => {
        if(response) {
          this.notificationService.showInfo('Signup successfull!' );
          alert('Please login to confirm your registration.');
        }
      },
      error: (error) => {
        this.notificationService.showClientError('Signup error:', error.message);
      },
      complete: () => {
        this.logger.log('Signup is now completed.');
        this.goToLogin();
      }
    };
    this.authService.registerUser(singupFormData).subscribe(observer);
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
