import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  
  loggedIn: boolean = false;
  subscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.authService.authChange$.subscribe(authStatus => {
      this.loggedIn = authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
