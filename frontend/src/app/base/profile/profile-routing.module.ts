import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CvComponent } from './components/cv/cv.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { CompleteInterestsComponent } from './components/complete-interests/complete-interests.component';
import { CompleteSignupComponent } from './components/complete-signup/complete-signup.component';

const routes: Routes = [
  { path: '', component: ProfileComponent, 
    children: [
      { path: '', component: ProfileDetailsComponent},
      { path: 'cv', component: CvComponent},
      { path: 'complete-profile', component: CompleteInterestsComponent},
      { path: 'complete-signup', component: CompleteSignupComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
