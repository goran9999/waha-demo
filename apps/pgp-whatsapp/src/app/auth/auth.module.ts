import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { BrowserModule } from '@angular/platform-browser';
import { SigninComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthComponent, SigninComponent],
  imports: [CommonModule, HttpClientModule, AuthRoutingModule],
  providers: [UserService],
})
export class AuthModule {}
