import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer, take } from 'rxjs';

import { AuthService } from '../auth.service';
import { LogInDtoResponse, LoginDto } from '../dto/login.interface';
import { NotificationService } from 'src/app/shared/notification.service';
import { LoggerService } from 'src/app/shared/logging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private logger: LoggerService
  ) {
    this.createForm();
  }
  ngOnInit(): void { }

  createForm() {
    return this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginFormData: LoginDto = this.loginForm.value;

    const observer: Observer<LogInDtoResponse> = {
      next: (response) => {
        if (response == undefined) {
          this.notificationService.showClientError('Incorrect email or password.')
          return;
        }
        localStorage.setItem('access_token', response.access_token);
        this.notificationService.showInfo('Login successful.');
        this.goToTasks();
      },
      error: (error) => {
        this.logger.log('Login error:', error);
        this.notificationService.showClientError('Error while logging in, please try again later')
      },
      complete: () => {
        this.logger.log('Login observable is now completed.');
      }
    };

    this.authService.login(loginFormData).pipe(take(1)).subscribe(observer);
  }
  goToTasks(): void {
    this.router.navigate(['/task']);
  }
}
