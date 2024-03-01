import { Component, OnInit } from '@angular/core';
import { Constant } from 'src/app/resources/constants/constants';
import { assignRole, fetchClassStudents, fetchClassroom, fetchRoles, fetchSubjects, searchSchoolStaff, searchUser } from '../../../models/management.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-assign-roles',
  templateUrl: './assign-roles.component.html',
  styleUrls: ['./assign-roles.component.scss']
})
export class AssignRolesComponent implements OnInit {
  mode: string = 'assign'
  open!: any;
  open2!: any;
  currentRole: any;

  memberList: any = []
  roleList: any = []

  selectedMemberList: any = []
  selectedRoleList: any = []

  selectedRole: any;
  openRole: any;

  requestLoading: boolean = false;
  imageUrl = Constant.IMAGE_URL
  user!: number;
  roleLoading!: boolean;
  classes: any;
  subjectList: any;
  searchLoading!: boolean;
  searchError: any;
  searchText: string = '';
  assignLoading!: boolean;

  constructor(private app: AppService) { }

  ngOnInit(): void {
    this.getRoles()
  }

  search(){
    let payload: searchSchoolStaff = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      keyword: this.searchText,
    }

    this.searchLoading = true
    setTimeout(() => {
      this.app.managementService.searchStaff(payload)
      .subscribe({
        next: res=>{
          this.searchLoading = false
          this.memberList = res
        },
        error: err=>{
          this.searchLoading = false
          this.searchError = err.message
        }
      })
    }, 2000);
  }
  
  getRoles(){
    this.roleLoading = true

    let payload: fetchRoles = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
    }

    this.app.managementService.fetchRoles(payload)
    .subscribe({
      next: res=>{
        this.roleList = res
        this.getData()
      }
    })
  }

  getData(){
    let payload: fetchClassroom = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
    }
    
    this.app.managementService.fetchClassroom(payload)
    .subscribe({
      next: (res: any) => {
        this.classes = res
        this.roleList.map((ele: any)=>{
          ele.access.map((el: any) =>{
            if(el.access_name == 'class_teacher'){
              el.text = el.class_id ? this.getClassName(el.class_id) : 'N/A'
            }
          })
        })
      },
    });

    return this.app.managementService.fetchSubjects(payload)
    .subscribe({
      next: (res: any) => {
        this.subjectList = res
        this.roleList.map((ele: any)=>{
          ele.access.map((el: any) =>{
            if(el.access_name == 'subject_teacher'){
              el.text = el.subject_ids ? this.getSubjectNames(el.subject_ids) : 'N/A'
            }
          })
        })
      },
    });
  }

  getClassName(id: number){
    let roleClass = this.classes.find((el: any)=> el.id == id)
    return roleClass.school + ' ' + roleClass.level
  }

  getSubjectNames(subjects: any){    
    let selSubjects: any = [];
    subjects.map((ele: number)=>{
      let roleClass = this.subjectList.find((el: any)=> el.id == ele)
      if(roleClass){
        selSubjects.push(roleClass.subject_name)
      }
    })
    return selSubjects.join(', ')
  }

  getStudentNames(student: any){
    return 'N/A'
  }

  selectStaff(member: any){
    if(this.selectedMemberList.length > 0){
      let isThere = this.selectedMemberList.find((el: any) => el.id == member.id)
      if(!isThere){
        this.selectedMemberList.push(member)
      }
    }else{
      this.selectedMemberList.push(member)
    }
  }

  selectRole(){
    if(this.selectedRoleList.length > 0){
      let isThere = this.selectedRoleList.find((el: any) => el.id == this.selectedRole.id)
      if(!isThere){        
        this.selectedRoleList.push(this.selectedRole)
      }
    }else{
      this.selectedRoleList.push(this.selectedRole)
    }
  }

  remove(member: any){
    this.selectedMemberList.splice(member, 1)
  }

  removeRole(){
    this.selectedRoleList.splice(this.selectedRoleList.indexOf(this.openRole), 1)
    this.openRole = ''
  }

  assign(){
    this.assignLoading = true
    let assign: assignRole = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      staff_id:  this.app.utilities.getUserId(),
      staff_type: this.selectedMemberList[0].user_type,
      user_id: this.selectedMemberList[0].id,
      role_id: this.selectedRoleList[0].id
    }

    this.app.managementService.assignRole(assign).subscribe({
      next: res=>{
        this.app.snackbar.open(res.message, 'Dismiss',{
          duration: Constant.TIMEOUT_DURATION
        })
        this.selectedMemberList = []
        this.selectedRoleList = []
        this.assignLoading = false
      }, error: err=>{
        this.app.snackbar.open(err.message, 'Dismiss',{
          duration: Constant.TIMEOUT_DURATION
        })
        this.assignLoading = false
      }
    })
  }

  editRole(role: any){
    this.mode = 'edit'
    this.currentRole = role
  }

  back(){
    this.mode = 'assign'
  }
}
