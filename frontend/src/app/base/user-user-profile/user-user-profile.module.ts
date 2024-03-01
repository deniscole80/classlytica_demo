import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserUserProfileRoutingModule } from './user-user-profile-routing.module';
import { UserUserProfileComponent } from './user-user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserUserFeedComponent } from './components/user-user-feed/user-user-feed.component';
import { UserUserMediaComponent } from './components/user-user-media/user-user-media.component';


@NgModule({
  declarations: [
    UserUserProfileComponent,
    UserDetailsComponent,
    UserUserFeedComponent,
    UserUserMediaComponent
  ],
  imports: [
    CommonModule,
    UserUserProfileRoutingModule,
    SharedModule
  ]
})
export class UserUserProfileModule { }
