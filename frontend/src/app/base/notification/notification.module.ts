import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { NotificationLikeComponent } from './components/notification-like/notification-like.component';
import { NotificationCommentComponent } from './components/notification-comment/notification-comment.component';
import { NotificationFollowComponent } from './components/notification-follow/notification-follow.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificationAllComponent } from './components/notification-all/notification-all.component';


@NgModule({
  declarations: [
    NotificationComponent,
    NotificationAllComponent,
    NotificationLikeComponent,
    NotificationCommentComponent,
    NotificationFollowComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SharedModule
  ]
})
export class NotificationModule { }
