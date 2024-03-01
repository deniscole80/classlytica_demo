import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ErrorPageComponent } from '../general-components/error-page/error-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: SidenavComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule),
      },

      {
        path: 'notifications',
        loadChildren: () => import('../base/notification/notification.module').then(m => m.NotificationModule),
      },

      {
        path: 'profile',
        loadChildren: () => import('../base/profile/profile.module').then(m => m.ProfileModule),
      },

      {
        path: 'user-profile',
        loadChildren: () => import('../base/user-user-profile/user-user-profile.module').then(m => m.UserUserProfileModule),
      },

      { 
        path: 'student-profile', 
        loadChildren: () => import('../base/user-student/user-student.module').then(m => m.UserStudentModule)
      },

      { 
        path: 'management', loadChildren: () => import('../base/management/management.module').then(m => m.ManagementModule) 
      },

      { path: 'search', loadChildren: () => import('../base/search/search.module').then(m => m.SearchModule) },

      { path: '**', component: ErrorPageComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
