import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { ProfilePictureComponent } from './components/profile-picture/profile-picture.component';
import { InterestComponent } from './components/interest/interest.component';
import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfilePictureComponent,
    InterestComponent,
    SuggestionsComponent,
    OverviewComponent,
  ],
  imports: [
    OnboardingRoutingModule,
    SharedModule,
  ]
})
export class OnboardingModule { }
