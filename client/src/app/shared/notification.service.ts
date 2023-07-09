import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private snackbar: MatSnackBar,
    private zone: NgZone,
  ) {}

  showClientError(message: string, info?: any): void {
    this.zone.run(() => {
      this.snackbar.open(`Error: ${message}`, 'Close', {
        duration: 3000,
        panelClass: ['error-snack'],
      });
    });
  }

  showInfo(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['info-snack'],
    });
  }
}
