import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  roles = this.app.utilities.getAllCurrentRole()
  isTeacher: any;
  isManager: any;

  constructor(private app: AppService) {
    if(this.roles){
      this.isTeacher = this.roles.access.find((el: any) => el.access_name == 'class_teacher')
      this.isManager = this.roles.access.find((el: any) => el.access_name == 'student_management')
    }else{
      this.isManager = 'something'
    }
   }

  ngOnInit(): void {

  }

}
