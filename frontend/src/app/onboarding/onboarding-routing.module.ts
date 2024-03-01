import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { ErrorPageComponent } from '../general-components/error-page/error-page.component';

const routes: Routes = [
  {
    path: '', component: OverviewComponent
  },
  { path: '**', component: ErrorPageComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
