import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationComponent } from './components/activation/activation.component';
import { EmailSuccessComponent } from './components/email-success/email-success.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SidebarBlueComponent } from './components/sidebar-blue/sidebar-blue.component';
import { SidebarWhiteComponent } from './components/sidebar-white/sidebar-white.component';
import { ConfirmOtpComponent } from './components/confirm-otp/confirm-otp.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { ErrorPageComponent } from '../general-components/error-page/error-page.component';

const routes: Routes = [
  {
    path: '', component: SidebarWhiteComponent
  },

  {
    path: 'sign-up', component: SidebarBlueComponent
  },

  {
    path: 'activation', component: ActivationComponent
  },

  {
    path: 'email-success', component: EmailSuccessComponent
  },

  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },

  {
    path: 'confirmation', component: ConfirmOtpComponent
  },

  {
    path: 'reset-password', component: PasswordResetComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
