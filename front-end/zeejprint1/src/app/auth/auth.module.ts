import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ReastPasswordComponent } from './reast-password/reast-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ReastPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class AuthModule { }
