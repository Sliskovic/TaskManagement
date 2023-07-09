import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material.module';
import { NavigationModule } from './navigation/navigation.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    TaskModule,
    AuthModule,
    NavigationModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
