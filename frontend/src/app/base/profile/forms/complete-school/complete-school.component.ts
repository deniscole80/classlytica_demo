import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant, Util } from 'src/app/resources/constants/constants';
import { editSchoolProfile, editUserProfile } from '../../models/profile.model';

@Component({
  selector: 'app-complete-school',
  templateUrl: './complete-school.component.html',
  styleUrls: ['./complete-school.component.scss']
})
export class CompleteSchoolComponent implements OnInit {
  signupForm!:FormGroup;
  loading: boolean = false;
  errorMsg: string = '';
  schoolName = this.app.utilities.getUserFirstName()
  username = this.app.utilities.getUserName()
  address = this.app.utilities.getUserAddress()
  email = this.app.utilities.getUserEmail()
  phone1 = this.app.utilities.getSchoolPhone1()
  phone2 = this.app.utilities.getSchoolPhone2()
  institutionType = this.app.utilities.getInstitutionType()
  countries = Util.countries
  text = this.app.utilities.getUserBio()
  payload!: editSchoolProfile

  constructor(private fb: FormBuilder, private app: AppService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.signupForm = this.fb.group({
      schoolname: [{value: this.schoolName, disabled: true}, Validators.required],
      username: [{value: this.username, disabled: true}],
      address: [{value: this.address, disabled: true}, Validators.required],
      phonenumber1: [this.phone1, Validators.required],
      phonenumber2: [this.phone2],
      email: [{value: this.email, disabled: true}, Validators.email],
      institutiontype: [{value: this.institutionType, disabled: true}, Validators.required],
    });
  }

  editAccount(){
    this.loading = true
    let form = this.signupForm

    this.payload = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      phone_number1: form.get('phonenumber1')?.value,
      phone_number2: form.get('phonenumber2')?.value,
      bio: this.text
    }

    this.app.profileService.editSchoolProfile(this.payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.app.utilities.setUserBio(this.text)
        this.app.utilities.setPhone1(form.get('phonenumber1')?.value)
        this.app.utilities.setPhone2(form.get('phonenumber2')?.value)
        this.router.navigateByUrl('/app/profile')
      },

      error: (error) => {
        this.loading = false
        this.errorMsg = typeof error == 'string' ? error : error.error
      }
    });
  }
}
