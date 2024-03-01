import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmailSuccessComponent } from './components/email-success/email-success.component';
import { ActivationComponent } from './components/activation/activation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SidebarBlueComponent } from './components/sidebar-blue/sidebar-blue.component';
import { SidebarWhiteComponent } from './components/sidebar-white/sidebar-white.component';
import { LoginComponent } from './forms/login/login.component';
import { SignUpComponent } from './forms/sign-up/sign-up.component';
import { SignUpSchoolComponent } from './forms/sign-up-school/sign-up-school.component';
import { ConfirmOtpComponent } from './components/confirm-otp/confirm-otp.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';



@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    SignUpSchoolComponent,
    EmailSuccessComponent,
    ActivationComponent,
    ForgotPasswordComponent,
    SidebarBlueComponent,
    SidebarWhiteComponent,
    ConfirmOtpComponent,
    PasswordResetComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
