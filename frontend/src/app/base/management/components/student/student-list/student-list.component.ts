import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { Util } from 'src/app/resources/helpers/utilities';
import { fetchClassStudents, fetchClassroom, fetchSchoolStudents } from '../../../models/management.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  tableLoad!: fetchClassStudents
  countries = Util.countries
  studentList: any = []
  sortForm!: FormGroup
  img_url = Constant.IMAGE_URL
  tableLoading: boolean = false;
  tableError: boolean = false;
  message: string = '';
  searchKey: string = ''; 
  listData!: MatTableDataSource<any> 
  studentList$!: Observable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  classLoading: boolean = false;
  classLoad!: fetchClassroom;
  classList: any[] = [];
  class: string = '';

  roles = this.app.utilities.getAllCurrentRole()
  isTeacher: any;
  isManager: any;

  constructor(private app: AppService, private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder, private router: Router) { 
    if(this.roles){
      this.isTeacher = this.roles.access.find((el: any) => el.access_name == 'class_teacher')
      this.isManager = this.roles.access.find((el: any) => el.access_name == 'student_management')
    }else{
      this.isManager = 'something'
    }
  }

  ngOnInit(): void {
    this.sortForm = this.fb.group({
      class: [''],
    })

    this.getClassroom();
    // this.getStudent();
  }

  getClassroom(){
    this.classLoading = true

    this.classLoad = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
    }

    this.app.managementService.fetchClassroom(this.classLoad)
    .subscribe({
      next: (res: any) => {
        this.classLoading = false
        this.classList = res

        if(this.isManager){
          this.sortForm.get('class')?.setValue(res[0].id)
        }else if(this.isTeacher){
          let data = this.classList.find((el: any) => el.id == this.isTeacher.class_id)
          console.log(data, 'class');
          this.sortForm.get('class')?.setValue(data.id)
          this.sortForm.get('class')?.disable()
        }

        this.getStudent()
      },

      error: (error) => {
        this.classLoading = false
      }
    });
  }

  getStudent(){
    this.tableLoading = true
    this.tableError = false

    this.tableLoad = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      class_id: this.sortForm.get('class')?.value
    }

    this.app.managementService.fetchClassStudents(this.tableLoad)
    .subscribe({
      next: (res: any) => {
        this.tableLoading = false
        this.tableError = false
        this.studentList = res
        this.listData = new MatTableDataSource(this.studentList)
        this.setPaginator()
        this.message = ''
      },

      error: (error) => {
        this.tableLoading = false
        this.tableError = true
        this.message = typeof error == 'string' ? error : error.message
      }
    });
  }

  viewStudent(student: any){
    this.router.navigate(['app/student-profile'], {queryParams: {type: 'student', classId: student.class_id, schoolId: student.school_id, id: student.id}})
  }

  setPaginator(){
    this.changeDetectorRef.detectChanges();
    this.listData.paginator = this.paginator;
    this.studentList$ = this.listData.connect(); 
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase()
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }


}
