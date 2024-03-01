import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { registerSchool, verifyEmail } from '../../model/auth.model';

@Component({
  selector: 'app-sign-up-school',
  templateUrl: './sign-up-school.component.html',
  styleUrls: ['./sign-up-school.component.scss']
})
export class SignUpSchoolComponent implements OnInit {
  signupForm!:FormGroup;
  loading: boolean = false;
  payload!: verifyEmail
  schoolLoad!: registerSchool
  errorMsg: string = '';
  institition: number = 1;

  constructor(private fb: FormBuilder, private app: AppService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.signupForm = this.fb.group({
      schoolname: ['', Validators.required],
      username: ['', Validators.required],
      address: ['', Validators.required],
      phonenumber1: ['', Validators.required],
      phonenumber2: [''],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      institutiontype: ["", Validators.required],
    });
  }

  addAccount(){
    let form = this.signupForm
    this.errorMsg = ''
    this.loading = true

    if(form.get('institutiontype')?.value == 'primary'){
      this.institition = 1
    }

    else if(form.get('institutiontype')?.value == 'secondary'){
      this.institition = 2
    }

    else if(form.get('institutiontype')?.value == 'both'){
      this.institition = 3
    }

    this.payload = {
      email: form.get('email')?.value,
      username: form.get('username')?.value,
    }

    this.schoolLoad = {
      user_type: 1,
      school_name: form.get('schoolname')?.value,
      username: form.get('username')?.value,
      phone_number1: form.get('phonenumber1')?.value,
      phone_number2: form.get('phonenumber2')?.value,
      address: form.get('address')?.value,
      email: form.get('email')?.value,
      institution_type: this.institition,
    }

    this.app.authService.verifyEmail(this.payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        if (res['message'] == 'Verification email sent') {
          this.loading = false
          this.app.snackbar.open(res['message'],  'Dismiss', {
            duration:Constant.TIMEOUT_DURATION
          })
          localStorage.setItem('account details', JSON.stringify(this.schoolLoad));
          this.router.navigateByUrl("/confirmation")
        }

        else {
          this.loading = false
          this.errorMsg = res['message']
        }
      },

      error: (error) => {
        
        this.loading = false
        this.errorMsg = typeof error == 'string' ? error : error.error
      }
    });
  }

}
