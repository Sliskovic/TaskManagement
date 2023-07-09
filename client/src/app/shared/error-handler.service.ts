import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { LoggerService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler  {

  constructor(private snackBar: MatSnackBar, private logger: LoggerService) { }

  handleError<T>(operation = 'operation', result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      this.logger.log(`${operation} failed: ${error.message}`);
      this.snackBar.open(`${operation} failed: ${error.message}`, 'Close', {
        duration: 3000, 
        panelClass: 'error-snackbar'
      });
      return of(result as T);
    };
  }
}
