import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementComponent } from './management.component';
import { StudentComponent } from './components/student/student.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './components/student/register/register.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { RegisterTeacherComponent } from './components/teacher/register-teacher/register-teacher.component';
import { ListTeacherComponent } from './components/teacher/list-teacher/list-teacher.component';
import { ParentComponent } from './components/parent/parent.component';
import { ParentListComponent } from './components/parent/parent-list/parent-list.component';
import { ParentRegisterComponent } from './components/parent/parent-register/parent-register.component';
import { ClassComponent } from './components/class/class.component';
import { RolesComponent } from './components/roles/roles.component';
import { CreateRolesComponent } from './components/roles/create-roles/create-roles.component';
import { AssignRolesComponent } from './components/roles/assign-roles/assign-roles.component';
import { SubjectComponent } from './components/subject/subject.component';
import { EditRolesComponent } from './components/roles/edit-roles/edit-roles.component';
import { ReportCardComponent } from './components/report-card/report-card.component';


@NgModule({
  declarations: [
    ManagementComponent,
    StudentComponent,
    TeacherComponent,
    RegisterComponent,
    StudentListComponent,
    RegisterTeacherComponent,
    ListTeacherComponent,
    ParentComponent,
    ParentListComponent,
    ParentRegisterComponent,
    ClassComponent,
    RolesComponent,
    CreateRolesComponent,
    AssignRolesComponent,
    SubjectComponent,
    EditRolesComponent,
    ReportCardComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule
  ]
})
export class ManagementModule { }
