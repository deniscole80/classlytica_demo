import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { createSubject, fetchSubjects } from '../../models/management.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  classForm!: FormGroup;
  loading: boolean = false;
  payload!: createSubject;
  tableLoad!: fetchSubjects;
  studentList: any[] = []
  tableLoading: boolean = false;
  tableError: boolean = false;
  message: string = '';
  levelList: any = []

  constructor(private fb: FormBuilder, private app: AppService) { }

  ngOnInit(): void {
    this.classForm = this.fb.group({
      subject: ['', Validators.required],
      alias: [''],
    });

    this.getClassroom();
  }

  addClass(){
    this.loading = true

    let form = this.classForm

    this.payload = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      subject_name: form.get('subject')?.value,
      alias: form.get('alias')?.value,
      staff_id: this.app.utilities.getUserId(),
      staff_type: this.app.utilities.getUserType()
    }

    this.app.managementService.createSubject(this.payload)
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

    this.app.managementService.fetchSubjects(this.tableLoad)
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
