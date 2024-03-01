import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant, Util } from 'src/app/resources/constants/constants';
import { editUserProfile } from '../../models/profile.model';

@Component({
  selector: 'app-complete-user',
  templateUrl: './complete-user.component.html',
  styleUrls: ['./complete-user.component.scss']
})
export class CompleteUserComponent implements OnInit {
  firstName = this.app.utilities.getUserFirstName()
  lastName = this.app.utilities.getUserLastName()
  username = this.app.utilities.getUserName()
  othernames = this.app.utilities.getUserOthername()
  type = this.app.utilities.getUserStatus()
  gender = this.app.utilities.getUserGender()
  email = this.app.utilities.getUserEmail()
  phone = this.app.utilities.getUserPhone()
  country = this.app.utilities.getUserCountry()
  countries = Util.countries
  loading: boolean = false;
  errorMsg: string = '';
  signupForm!:FormGroup;
  text = this.app.utilities.getUserBio()
  payload!: editUserProfile;

  constructor(private fb: FormBuilder, private app: AppService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.signupForm = this.fb.group({
      firstname: [{value: this.firstName, disabled: true}, Validators.required],
      lastname: [{value: this.lastName, disabled: true}, Validators.required],
      username: [{value: this.username, disabled: true}],
      othernames: [{value: this.othernames, disabled: true}],
      gender: [{value: this.gender, disabled: true}, Validators.required],
      country: [{value: this.country, disabled: true}, Validators.required],
      individual: [{value: this.type, disabled: true}, Validators.required],
      email: [{value: this.email, disabled: true}, Validators.email],
      phonenumber: [this.phone, Validators.required],
    });
  }

  editAccount(){
    this.loading = true
    this.errorMsg = ''
    let form = this.signupForm

    this.payload = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      phone_number: form.get('phonenumber')?.value,
      bio: this.text
    }

    this.app.profileService.editUserProfile(this.payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.app.utilities.setUserBio(this.text)
        this.app.utilities.setPhoneNumber(form.get('phonenumber')?.value)
        this.router.navigateByUrl('/app/profile')
      },

      error: (error) => {
        this.loading = false
        this.errorMsg = typeof error == 'string' ? error : error.error
      }
    });
  }

}
