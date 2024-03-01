import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserStudentComponent } from './user-student.component';

const routes: Routes = [{ path: '', component: UserStudentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserStudentRoutingModule { }
