import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      request = request.clone({
        headers: new HttpHeaders().set(
          'Authorization',
          `Bearer ${accessToken}`
        ),
      });
    }

    return next.handle(request);
  }
}
