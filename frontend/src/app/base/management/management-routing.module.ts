import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management.component';
import { StudentComponent } from './components/student/student.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { ParentComponent } from './components/parent/parent.component';
import { ClassComponent } from './components/class/class.component';
import { RolesComponent } from './components/roles/roles.component';
import { SubjectComponent } from './components/subject/subject.component';
import { ReportCardComponent } from './components/report-card/report-card.component';

const routes: Routes = [
  { 
    path: '', component: ManagementComponent, children: [
      {
        path: '', redirectTo: 'student'
      },
      {
        path: 'student', component : StudentComponent
      },
      {
        path: 'teacher', component : TeacherComponent
      },
      {
        path: 'parent', component : ParentComponent
      },
      {
        path: 'classroom', component : ClassComponent
      },

      {
        path: 'reportcard', component : ReportCardComponent
      },

      {
        path: 'subjects', component : SubjectComponent
      },

      {
        path: 'role-manager', component : RolesComponent
      },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
