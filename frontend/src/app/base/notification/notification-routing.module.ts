import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationAllComponent } from './components/notification-all/notification-all.component';
import { NotificationCommentComponent } from './components/notification-comment/notification-comment.component';
import { NotificationFollowComponent } from './components/notification-follow/notification-follow.component';
import { NotificationLikeComponent } from './components/notification-like/notification-like.component';
import { NotificationComponent } from './notification.component';

const routes: Routes = [
  { path: '', 
    component: NotificationComponent,
    children: [
      {path: '', redirectTo: 'likes', pathMatch: 'full'},
      { path: 'likes', component: NotificationLikeComponent },
      { path: 'all', component: NotificationAllComponent },
      { path: 'comments', component: NotificationCommentComponent },
      { path: 'follow', component: NotificationFollowComponent }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
