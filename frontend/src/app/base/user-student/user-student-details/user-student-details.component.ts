import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AppService } from 'src/app/app.service';
import { fetchClassroom, fetchParent, fetchStudentTeacher } from '../../management/models/management.model';
import { Constant } from 'src/app/resources/constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-student-details',
  templateUrl: './user-student-details.component.html',
  styleUrls: ['./user-student-details.component.scss']
})
export class UserStudentDetailsComponent implements OnInit {

  @Input() userData: any;
  loading: boolean = false;
  error: boolean = false;
  message: any;
  tabValue: number = 0;
  class: any;
  parentList: any = [];
  imageUrl = Constant.IMAGE_URL
  userType = this.app.utilities.getUserType()
  classLoading!: boolean;
  teacherLoading: boolean = false;
  teacher: any = null;

  constructor(private app: AppService, private dialog: MatDialog, private router: Router) { 

  }

  ngOnInit(): void {
    this.getClass()
    this.getParents()
    this.viewTeacher()
  }

  getClass(){
    let payload: fetchClassroom = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
    }
    this.classLoading = true

    this.app.managementService.fetchClassroom(payload)
    .subscribe({
      next: (res: any) => {
        this.classLoading = false
        this.class = res.find((el: any)=> el.id == this.userData.class_id)
      },

      error: (error) => {
        this.classLoading = false
      }
    });
  }

  getParents(){
    let payload: fetchParent = {
      employer_id: this.userData.school_id,
      student_id: this.userData.id
    }


    this.app.managementService.fetchStudentParent(payload)
    .subscribe({
      next: (res: any) => {
        this.parentList = res        
      },

      error: (error) => {
        // this.classLoading = false
      }
    });
  }

  viewParent(parent: any){
    let encUserId = btoa(parent?.id)
    let encUserType = btoa(parent?.user_type)
    this.router.navigate(['/app/user-profile'], {queryParams: {userid: encUserId, usertype: encUserType}})
  }

  viewTeacher(){
    this.teacherLoading = true
    let payload: fetchStudentTeacher = {
      school_id: this.userData.school_id,
      student_id: this.userData.id
    }

    this.app.managementService.fetchStudentTeacher(payload)
    .subscribe({
      next: (res: any) => {
        this.teacherLoading = false
        this.teacher = res   
        console.log(this.teacher);
             
      },

      error: (error) => {
        this.teacherLoading = false
      }
    });
  }

  checkTeacher(teacher: any){
    let encUserId = btoa(teacher?.id)
    let encUserType = btoa(teacher?.user_type)
    this.router.navigate(['/app/user-profile'], {queryParams: {userid: encUserId, usertype: encUserType}})
  }

  formatDate(date: string){
    return date.replace(/-/g, '/')
  }
}
