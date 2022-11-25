import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingRoutingModule } from './auth-routing-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingRoutingModule
  ]
})
export class AuthModule { }
