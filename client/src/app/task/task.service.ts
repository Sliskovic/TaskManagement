import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { TaskDto } from './dto/task.interface';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getTasks(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.baseUrl + '/tasks').pipe(
      map((response: TaskDto[]) => {
        return response;
      }),
      catchError(this.errorHandler.handleError<TaskDto[]>('GetTasks', []))
    );
  }

  getTaskbyId(taskId: number): Observable<TaskDto> {
    return this.http.get<TaskDto>(`${this.baseUrl + '/tasks'}/${taskId}`).pipe(
      map((response: TaskDto) => {
        return response;
      }),
      catchError(this.errorHandler.handleError<TaskDto>('GetTaskbyId'))
    );
  }

  deleteTask(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl + '/tasks'}/${id}`).pipe(
      map((response: string) => {
        return response;
      }),
      catchError(this.errorHandler.handleError<string>('DeleteTask'))
    );
  }

  updateTask(id: number, task: Partial<TaskDto>): Observable<TaskDto> {
    return this.http.patch<TaskDto>(`${this.baseUrl + '/tasks'}/${id}`, task).pipe(
      map((response: TaskDto) => {
        return response;
      }),
      catchError(this.errorHandler.handleError<TaskDto>('UpdateTask'))
    );
  }

  createTask(newTask: TaskDto): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.baseUrl + '/tasks' + '/create', newTask).pipe(
      map((response: TaskDto) => {
        return response;
      }),
      catchError(this.errorHandler.handleError<TaskDto>('CreateTask'))
    );
  }
}
