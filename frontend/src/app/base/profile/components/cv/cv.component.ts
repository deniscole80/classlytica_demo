import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { createCv, viewCv } from '../../models/profile.model';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  firstName: string = this.app.utilities.getUserFirstName();
  lastName: string = this.app.utilities.getUserLastName();
  userName: string = this.app.utilities.getUserName();
  loading: boolean = false;
  payload!: createCv;
  cvLoad!: viewCv;
  cvForm!: FormGroup;
  cvError: boolean = false;

  tableList: any = [
    {work_place: '', duration: '', role: ''}
  ]
  cvLoading: boolean = false;
  cvData: any;
  constructor(private app: AppService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cvForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      primary: ['', Validators.required],
      secondary: ['', Validators.required],
      university: ['', Validators.required],
    });

    this.getCV()
  }

  add(id: number){
    this.tableList.splice(id + 1, 0, {work_place: '', duration: '', role: ''})
  }

  delete(id: number){
    this.tableList.splice(id, 1)
  }

  submitCv(){
    this.loading = true
    let form = this.cvForm
    this.tableList = this.tableList.filter((el: any) => el.work_place != '')

    this.payload = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      firstname: form.get('firstname')?.value,
      lastname: form.get('lastname')?.value,
      address: form.get('address')?.value,
      mobile: form.get('mobile')?.value,
      email: form.get('email')?.value,
      pry_school: form.get('primary')?.value,
      sec_school: form.get('secondary')?.value,
      university: form.get('university')?.value,
      experience: this.tableList
    }

    this.app.profileService.createCv(this.payload)
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

  getCV(){
    this.cvLoading = true
    this.cvError = false

    let form = this.cvForm

    this.cvLoad = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType()
    }

    this.app.profileService.viewCv(this.cvLoad)
    .subscribe({
      next: (res: any) => {
        this.cvLoading = false
        this.cvError = false
        this.cvData = res
        if(res.message != 'not found'){
          form.get('firstname')?.setValue(this.cvData?.firstname)
          form.get('lastname')?.setValue(this.cvData?.lastname)
          form.get('address')?.setValue(this.cvData?.address)
          form.get('mobile')?.setValue(this.cvData?.mobile)
          form.get('email')?.setValue(this.cvData?.email)
          form.get('primary')?.setValue(this.cvData?.pry_school)
          form.get('secondary')?.setValue(this.cvData?.sec_school)
          form.get('university')?.setValue(this.cvData?.university)

          if(this.cvData?.experience?.length != 0){
            this.tableList= this.cvData?.experience
            console.log('i call');
            
          }
          
        }
      },

      error: (error) => {
        this.cvLoading = false
        this.cvError = true
        this.app.snackbar.open(typeof error == 'string' ? error : error.error,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
    
  }


}
