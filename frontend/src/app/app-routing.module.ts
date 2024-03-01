import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ErrorPageComponent } from './general-components/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'onboarding',
    loadChildren: () => import('../app/onboarding/onboarding.module').then(m => m.OnboardingModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'app',
    loadChildren: () => import('../app/base/base.module').then(m => m.BaseModule),
  },
  { path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
