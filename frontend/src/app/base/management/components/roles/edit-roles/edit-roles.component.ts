import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { createRole, editRoles, fetchClassroom, fetchSubjects, roleAssign } from '../../../models/management.model';

@Component({
  selector: 'app-edit-roles',
  templateUrl: './edit-roles.component.html',
  styleUrls: ['./edit-roles.component.scss']
})
export class EditRolesComponent implements OnInit {
  @Input() role: any;
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
  payload!: editRoles;
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

        let classI = this.role.access.find((e: any) => e.access_name == 'class_teacher')
        if(classI){
          this.selectedClass = this.studentList.find((el: any)=> el.id == classI.class_id)
          this.classItem = this.roleList[0]
          this.populateData() 
        }
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
        
        let subjectI = this.role.access.find((e: any) => e.access_name == 'subject_teacher')
        if(subjectI){
          
          this.subjectList.filter((el: any)=> {
            if(subjectI.subject_ids.includes(el.id)){
              el.checked = true
              this.subjects.push(el.id)
            }
          })
          
        }
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

  populateData(){
    this.roleName = this.role.role_name


   
    for (let i = 0; i < this.roleList.length; i++) {
      for (let j = 0; j < this.role.access.length; j++) {
        if(this.role.access[j].access_name == this.roleList[i].role){
          this.roleList[i].isChecked = true
          this.pushRoles(this.roleList[i], true)    
        }
      }
    }    

    
  }

  pushRoles(item: any, checkedRole: boolean){

    if(checkedRole == true){
      if(item.role == 'class_teacher'){
        this.classItem = item
        this.roleAssign = {
          access_name: item?.role,
          class_id: this.selectedClass?.id
        }

        this.allRoles.push(this.roleAssign)
      }

      else if(item.role == 'subject_teacher'){
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
      role_id: this.role.id,
      access: this.allRoles
    }

    this.app.managementService.editRoles(this.payload)
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
