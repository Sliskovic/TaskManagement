import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, map, of } from 'rxjs';

import { UserDto } from './dto/singup.interface';
import { LogInDtoResponse, LoginDto } from './dto/login.interface';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange$ = new Subject<boolean>();

  private baseUrl = environment.baseUrl;
  private loggedIn = false;
  private user!: UserDto;
  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  login(login: LoginDto): Observable<LogInDtoResponse> {
    const body: LoginDto = (this.user = {
      email: login.email.toLowerCase(),
      password: login.password,
    });

    return this.http
      .post<LogInDtoResponse>(this.baseUrl + '/auth/log-in', body)
      .pipe(
        map((response: LogInDtoResponse) => {
          this.loggedIn = true;
          this.authChange$.next(true);
          return response;
        }),
        catchError(this.errorHandler.handleError<LogInDtoResponse>('Login'))
      );
  }
  registerUser(user: UserDto): Observable<UserDto> {
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.toLowerCase(),
      password: user.password,
    };
    return this.http.post<UserDto>(this.baseUrl + '/auth/sing-up', body).pipe(
      map((response: UserDto) => {
        this.loggedIn = true;
        this.authChange$.next(true);
        return response;
      }),
      catchError(this.errorHandler.handleError<UserDto>('Singup', this.user))
    );
  }

  checkIsLoggedIn() {
    return this.loggedIn; // false
  }
  logOut() {
    const confirmation = confirm('Are you sure you want to logout?');
    if (confirmation) {
      this.loggedIn = false;
      this.authChange$.next(false);
      localStorage.removeItem('access_token');
      this.router.navigate(['/task']);
    }
  }
}
