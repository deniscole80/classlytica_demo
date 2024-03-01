import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { MustMatch } from 'src/app/resources/utilities/password-match';
import { setPassword } from '../../model/auth.model';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  resetForm!: FormGroup
  resetLoading: boolean = false;
  errorMsg: any;
  resetLoad!: setPassword
  email: any;
  token: any;
  hide = true;
  hide2 = true;
  setDisabled: boolean = true;

  constructor(
    // private customValidator: CustomValidatorService, 
    private fb: FormBuilder,
    private app: AppService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.route.queryParams.subscribe((params)=>{
        this.email = params['email']
        this.token = params['token']
      })
     }

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'confirmpassword': ['', Validators.compose([Validators.required, Validators.minLength(8)])]
    },
    {
      validator: MustMatch("password", "confirmpassword"),
    } as AbstractControlOptions
    )
  }

  resetPassword(){
    let form = this.resetForm
    this.resetLoading = true

    this.resetLoad = {
      email: this.email,
      password: form.get('password')?.value
    }
    
    
    this.app.authService.setPassword(this.resetLoad, this.token)
    .subscribe({
      next: (res: any) => {
        this.resetLoading = false
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.router.navigateByUrl("/")
      },
      error: (error) => {
        this.resetLoading = false
        this.errorMsg = typeof error == 'string' ? error : error.message
      }
    });
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
