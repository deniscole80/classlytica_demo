import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Constant, Util } from 'src/app/resources/constants/constants';
import { group, searchParent, searchStudent, studentParentGroup } from '../../../models/management.model';

@Component({
  selector: 'app-parent-register',
  templateUrl: './parent-register.component.html',
  styleUrls: ['./parent-register.component.scss']
})
export class ParentRegisterComponent implements OnInit {
  registerForm!: FormGroup
  countries = Util.countries
  fileSystemImage!: string | ArrayBuffer | null;
  searchLoading: boolean = false;
  searchError: any;
  searchLoading2: boolean = false;
  searchError2: any;
  searchText: string= '';
  searchText2: string= '';
  parentList: any
  studentList: any
  imgUrl = Constant.IMAGE_URL
  innerHeight = window.innerHeight - (436);
  innerHeight2 = window.innerHeight - (450);
  parentLoading: boolean = false;
  studentLoading: boolean = false
  parentGroup: any[] = [];
  studentGroup: any[] = [];
  parents: number[] = [];
  students: number[] = [];
  groupLoading: boolean = false;
  groupArray: any[] = []

  constructor(private fb: FormBuilder, private app: AppService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      othernames: [''],
      username: [''],
      gender: [''],
      DOB: [''],
      individual: [''],
      country: [''],
      stateoforigin: [''],
    })
  }

  searchParent(){
    if(this.searchText == ''){
      this.parentList = []
    }

    let payload: searchParent = {
      keyword: this.searchText,
    }

    this.searchLoading = true
    this.app.managementService.searchParent(payload)
    .subscribe({
      next: res=>{
        this.searchLoading = false
        this.parentList = res
        if(this.searchText == ''){
          this.parentList = []
        }
      },
      error: err=>{
        this.searchLoading = false
        this.searchError = err.message
      }
    })
  }

  searchStudent(){
    if(this.searchText2 == ''){
      this.studentList = []
    }

    let payload2: searchStudent = {
      keyword: this.searchText2,
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
    }

    this.searchLoading2 = true
    this.app.managementService.searchStudent(payload2)
    .subscribe({
      next: res=>{
        this.searchLoading2 = false
        this.studentList = res
        if(this.searchText2 == ''){
          this.studentList = []
        }
      },
      error: err=>{
        this.searchLoading2 = false
        this.searchError2 = err.message
      }
    })
  }

  setImage(image: any){
    let file = image.target.files[0]
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.fileSystemImage = reader.result;
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  addParent(parent: any){
    
    this.parentLoading = true

    if(this.parentGroup.length == 0){
      this.parentGroup.push(parent)
      this.parentLoading = false
    }

    else{
      let same = this.parentGroup.find((el: any) =>{
        return el.id == parent.id
      })

      if(same){
        this.app.snackbar.open('Parent already exists in group',  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.parentLoading = false
      }
      else{
        this.parentGroup.push(parent)
        this.parentLoading = false
      }
    }

  }

  addStudent(student: any){
    
    if(this.studentGroup.length == 0){
      this.studentGroup.push(student)
      this.studentLoading = false
    }

    else{
      let same = this.studentGroup.find((el: any) =>{
        return el.id == student.id
      })

      if(same){
        this.app.snackbar.open('Student already exists in group',  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.studentLoading = false
      }
      else{
        this.studentGroup.push(student)
        this.studentLoading = false
      }
    }
  }

  groupItems(){
    this.groupLoading = true

    if(this.parentGroup.length == 0 || this.studentGroup.length == 0){
      this.groupLoading = false
    }

    for (let i = 0; i < this.parentGroup.length; i++) {
      this.parents.push(this.parentGroup[i]?.id);
    }

    for (let i = 0; i < this.studentGroup.length; i++) {
      this.students.push(this.studentGroup[i]?.id);
    }


    let items: group = {
      parents: this.parents,
      students: this.students
    }

    this.groupArray.push(items)


    let groupLoad: studentParentGroup = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      staff_id: this.app.utilities.getUserId(),
      staff_type: 1,
      group: this.groupArray
    }

    this.app.managementService.studentParentGroup(groupLoad)
    .subscribe({
      next: res=>{
        this.groupLoading = false
        this.app.snackbar.open('Group successfully created',  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.parentGroup = []
        this.studentGroup = []
        this.searchText = ''
        this.searchText2 = ''
        this.searchParent()
        this.searchStudent()
      },
      error: err=>{
        this.groupLoading = false
        this.app.snackbar.open(typeof err == 'string' ? err : err.message,  'Dismiss', {
        duration:Constant.TIMEOUT_DURATION
        })
      }
    })
  }

  removeParent(parent: any){
    this.parentGroup.splice(parent, 1)

  }

  removeStudent(student: any){
    this.studentGroup.splice(student, 1)
  }
}
