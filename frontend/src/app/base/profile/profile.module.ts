import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FollowersFollowingComponent } from './components/followers-following/followers-following.component';
import { MediaComponent } from './components/media/media.component';
import { CvComponent } from './components/cv/cv.component';
import { UserFeedComponent } from './components/user-feed/user-feed.component';
import { UserMediaComponent } from './components/user-media/user-media.component';
import { CompleteInterestsComponent } from './components/complete-interests/complete-interests.component';
import { CompleteSignupComponent } from './components/complete-signup/complete-signup.component';
import { CompleteSchoolComponent } from './forms/complete-school/complete-school.component';
import { CompleteUserComponent } from './forms/complete-user/complete-user.component';
import { ViewKidsComponent } from './components/view-kids/view-kids.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent,
    FollowersFollowingComponent,
    MediaComponent,
    CvComponent,
    UserFeedComponent,
    UserMediaComponent,
    CompleteInterestsComponent,
    CompleteSignupComponent,
    CompleteSchoolComponent,
    CompleteUserComponent,
    ViewKidsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
