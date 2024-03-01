import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserUserProfileComponent } from './user-user-profile.component';

const routes: Routes = [{ path: '', component: UserUserProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserUserProfileRoutingModule { }
