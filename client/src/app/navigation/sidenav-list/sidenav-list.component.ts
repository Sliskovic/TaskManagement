import { Component, EventEmitter, Output } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private authService: AuthService) { }
  
  onClose(){
    this.sidenavToggle.emit();
  }
  
  onLogout(){
    this.onClose();
    this.authService.logOut();
  }
}
