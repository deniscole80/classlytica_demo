import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { MustMatch } from 'src/app/resources/utilities/password-match';
import { CustomValidatorService } from 'src/app/services/custom-validator.service';
import { registerSchool, registerUser, setPassword } from '../../model/auth.model';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  resetForm!: FormGroup
  resetLoading: boolean = false;
  errorMsg: any;
  accountDetails!: any
  data!: any;
  hide = true;
  hide2 = true;
  setDisabled: boolean = true;

  constructor(
    // private customValidator: CustomValidatorService, 
    private fb: FormBuilder,
    private app: AppService,
    private router: Router
    ) {
      this.accountDetails = localStorage.getItem(Constant.USERDETAILS)
      this.data = JSON.parse(this.accountDetails)
     }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      'password': ['', Validators.required],
      'confirmpassword': ['', Validators.required]
    },
    {
      validator: MustMatch("password", "confirmpassword"),
    } as AbstractControlOptions
    )
  }

  resetPassword(){
    let form = this.resetForm
    this.resetLoading = true

    if(this.data){
      if(this.data?.user_type == 1){
        let resetLoad: registerSchool = {
          user_type: 1,
          school_name: this.data?.school_name,
          username: this.data?.username,
          phone_number1: this.data?.phone_number1,
          phone_number2: this.data?.phone_number2,
          address: this.data?.address,
          email: this.data?.email,
          institution_type: this.data?.institution_type,
          password: form.get('password')?.value
        }
  
        this.app.authService.registerSchool(resetLoad)
        .subscribe({
          next: (res: any) => {
            this.resetLoading = false
            if (res['message'] == 'Registration successfully') {
              this.resetLoading = false
              this.app.snackbar.open(res['message'],  'Dismiss', {
                duration:Constant.TIMEOUT_DURATION
              })
              this.router.navigateByUrl("/")
            }
    
            else {
              this.resetLoading = false
              this.errorMsg = res['message']
            }
          },
    
          error: (error) => {
            this.resetLoading = false
            this.errorMsg = typeof error == 'string' ? error : error.error
          }
        });
      }
  
      else{
        let resetLoad: registerUser = {
          user_type: 2,
          first_name: this.data?.first_name,
          last_name: this.data?.last_name,
          other_name: this.data?.other_name,
          username: this.data?.username,
          gender: this.data?.gender,
          country: this.data?.country,
          status: this.data?.status,
          email: this.data?.email,
          phone_number: this.data?.phone_number,
          password: form.get('password')?.value,
        }
  
        this.app.authService.registerUser(resetLoad)
        .subscribe({
          next: (res: any) => {
            this.resetLoading = false
            this.app.snackbar.open(res['message'],  'Dismiss', {
              duration:Constant.TIMEOUT_DURATION
            })
            this.router.navigateByUrl("/")
            localStorage.clear()
          },
  
          error: (error) => {
            this.resetLoading = false
            this.errorMsg = error.message
          }
        });
      }
    }

    else{
      this.resetLoading = false
      this.errorMsg = 'No user data'
    }

    
    
  }

  getPassword(){    
    let form = this.resetForm
    if(form.get('password')?.value.length < 8 || form.get('confirmpassword')?.value.length < 8){
      this.errorMsg = 'Password must have minimum of 8 characters'
      this.setDisabled = true
    }

    else{
      this.setDisabled = false
      this.errorMsg = ''
    }
  }

}
