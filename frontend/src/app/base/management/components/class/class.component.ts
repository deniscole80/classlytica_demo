import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { createClassroom, fetchClassroom } from '../../models/management.model';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  classForm!: FormGroup;
  loading: boolean = false;
  payload!: createClassroom;
  tableLoad!: fetchClassroom;
  studentList: any[] = []
  tableLoading: boolean = false;
  tableError: boolean = false;
  message: string = '';

  filterArray: any = [
    {class: 'Creche', classes: [1, 2, 3, 4, 5, 6]},
    {class: 'Nursery', classes: [1, 2, 3]},
    {class: 'Primary', classes: [1, 2, 3, 4, 5, 6]},
    {class: 'Junior Secondary School', classes: [1, 2, 3]},
    {class: 'Senior Secondary School', classes: [1, 2, 3]},
  ]

  levelList: any = []

  constructor(private fb: FormBuilder, private app: AppService) { }

  ngOnInit(): void {
    this.classForm = this.fb.group({
      school: ['', Validators.required],
      level: ['', Validators.required],
      alias: [''],
    });

    this.getClassroom();
  }

  addClass(){
    this.loading = true

    let form = this.classForm

    this.payload = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      school: form.get('school')?.value.class,
      level: parseInt(form.get('level')?.value),
      alias: form.get('alias')?.value,
      staff_id: this.app.utilities.getUserId(),
      staff_type: this.app.utilities.getUserType()
    }

    this.app.managementService.createClassroom(this.payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.getClassroom()
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      },

      error: (error) => {
        this.loading = false
        this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });

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
        this.message = ''
      },

      error: (error) => {
        this.tableLoading = false
        this.tableError = true
        this.message = typeof error == 'string' ? error : error.message
      }
    });
  }

}
