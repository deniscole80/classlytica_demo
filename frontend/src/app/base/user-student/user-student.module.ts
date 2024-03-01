import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserStudentRoutingModule } from './user-student-routing.module';
import { UserStudentComponent } from './user-student.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserStudentDetailsComponent } from './user-student-details/user-student-details.component';
import { UserStudentMediaComponent } from './user-student-media/user-student-media.component';


@NgModule({
  declarations: [
    UserStudentComponent,
    UserStudentDetailsComponent,
    UserStudentMediaComponent
  ],
  imports: [
    CommonModule,
    UserStudentRoutingModule,
    SharedModule
  ]
})
export class UserStudentModule { }
