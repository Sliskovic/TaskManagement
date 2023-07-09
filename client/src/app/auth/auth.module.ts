import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material.module';
import { ErrorHandlerService } from '../shared/error-handler.service';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
  ],
  exports: [LoginComponent],
})
export class AuthModule { }
