import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { getDate, getDateGB } from 'src/app/resources/constants/date-format';
import { Util } from 'src/app/resources/helpers/utilities';
import { fetchClassroom } from '../../../models/management.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false
  registerForm!: FormGroup
  countries = Util.countries
  fileSystemImage: any;
  File!: File;
  tableLoad!: fetchClassroom;
  studentList: any[] = []
  tableLoading: boolean = false;
  date: string = '';

  constructor(private fb: FormBuilder, private app: AppService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      othernames: [''],
      gender: ['', Validators.required],
      DOB: ['', Validators.required],
      class: [''],
      country: ['', Validators.required],
      stateoforigin: ['', Validators.required],
    })

    this.getClassroom()
  }

  setImage(image: any){
    let file: File = image.target.files[0]
    this.File = <File>image.target.files[0];

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

  addStudent(){
    this.loading = true

    let form = this.registerForm   
    let formData = new FormData();

    this.date = getDateGB(form.get('DOB')?.value)
  

    formData.append('first_name', form.get('firstname')?.value)
    formData.append('last_name', form.get('lastname')?.value)
    formData.append('other_name', form.get('othernames')?.value)
    formData.append('gender', form.get('gender')?.value)
    formData.append('dob', this.date)
    formData.append('class_id', form.get('class')?.value)
    formData.append('country', form.get('country')?.value)
    formData.append('state', form.get('stateoforigin')?.value)
    formData.append('file', this.File, this.File.name)
    formData.append('school_id', this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),)
    formData.append('staff_id', this.app.utilities.getUserId())
    formData.append('staff_type', this.app.utilities.getUserType())

    

    this.app.managementService.createStudent(formData)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.registerForm.reset()
        this.fileSystemImage = null
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

    this.tableLoad = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
    }

    this.app.managementService.fetchClassroom(this.tableLoad)
    .subscribe({
      next: (res: any) => {
        this.tableLoading = false
        this.studentList = res
      },

      error: (error) => {
        this.tableLoading = false
      }
    });
  }
}
