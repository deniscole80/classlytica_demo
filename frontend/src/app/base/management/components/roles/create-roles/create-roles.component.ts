import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { createRole, fetchClassroom, fetchSubjects, roleAssign } from '../../../models/management.model';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {
  roleName: string = '';
  roleList: any[] = [
    { name: 'Class Teacher', role: 'class_teacher', isChecked: false, isDrop: true },
    { name: 'Student Management', role: 'student_management', isChecked: false, isDrop: false },
    { name: 'Subject Teacher', role: 'subject_teacher', isChecked: false, isDrop: true },
    { name: 'Subject Management', role: 'subject_management', isChecked: false, isDrop: false },
    { name: 'Staff Management', role: 'staff_management', isChecked: false, isDrop: false },
    { name: 'Class Management', role: 'class_management', isChecked: false, isDrop: false },
    { name: 'Parent Management', role: 'parent_management', isChecked: false, isDrop: false },
    { name: 'Role Management', role: 'role_management', isChecked: false, isDrop: false },
  ]
  open: boolean = false;
  open2: boolean = false;
  tableLoad!: fetchClassroom;
  studentList: any[] = []
  tableLoading: boolean = false;
  loading: boolean = false;
  tableError: boolean = false;
  subjectLoad!: fetchSubjects;
  subjectList: any[] = []
  subjectLoading: boolean = false;
  subjectError: boolean = false;
  classes: number[] = [];
  subjects: number[] = [];
  allRoles: roleAssign[] = []
  roleAssign!: roleAssign
  payload!: createRole;
  selectedClass: any;
  classItem: any;

  constructor(private app: AppService) { }

  ngOnInit(): void {
    this.getClassroom()
    this.getSubject()
  }

  getClassroom(){
    this.tableLoading = true
    this.tableError = false

    this.tableLoad = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
    }

    this.app.managementService.fetchClassroom(this.tableLoad)
    .subscribe({
      next: (res: any) => {
        this.tableLoading = false
        this.tableError = false
        this.studentList = res
      },

      error: (error) => {
        this.tableLoading = false
        this.tableError = true
      }
    });
  }

  getSubject(){
    this.subjectLoading = true
    this.subjectError = false

    this.subjectLoad = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
    }

    this.app.managementService.fetchSubjects(this.subjectLoad)
    .subscribe({
      next: (res: any) => {
        this.subjectLoading = false
        this.subjectError = false
        this.subjectList = res
      },

      error: (error) => {
        this.subjectLoading = false
        this.subjectError = true
      }
    });
  }

  selectValue(child: any){    
    this.selectedClass = child
    if(this.classItem){

      this.roleAssign = {
        access_name: this.classItem?.role,
        class_id: this.selectedClass?.id
      }
  
      this.allRoles.push(this.roleAssign)
    }    
  }

  checkSubject(value: any, checked: any){ 
    value.checked = checked   
    if(checked == true){
      this.subjects.push(value?.id)
    }

    else{
      let interest = this.subjects.indexOf(value?.id)
      this.subjects.splice(interest, 1)
    }

  }

  pushRoles(item: any, checkedRole: boolean){

    if(checkedRole == true){
      if(item.name == 'Class Teacher'){
        this.classItem = item
        this.roleAssign = {
          access_name: item?.role,
          class_id: this.selectedClass?.id
        }

        this.allRoles.push(this.roleAssign)
      }

      else if(item.name == 'Subject Teacher'){
        this.roleAssign = {
          access_name: item?.role,
          subject_ids: this.subjects
        }
        this.allRoles.push(this.roleAssign)
      }

      else{
        this.roleAssign = {
          access_name: item?.role,
        }
        this.allRoles.push(this.roleAssign)
      }
    }

    else{
      let interest = this.allRoles.indexOf(item?.id)
      this.allRoles.splice(interest, 1)

      this.classItem = null
    }

    
  }

  createRole(){
    this.loading = true

    this.payload = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      staff_id: this.app.utilities.getUserId(),
      staff_type: this.app.utilities.getUserType(),
      role_name: this.roleName,
      access: this.allRoles
    }

    this.app.managementService.createRoles(this.payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      },

      error: (error) => {
        this.loading = false
        this.app.snackbar.open(typeof error == 'string' ? error : error.error,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
  }

}
