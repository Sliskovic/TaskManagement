import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor(private http: HttpClient) {}

  log(message: string, info?: any) {
    console.log('Logger: ' + message);
  }
}
