import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { login } from '../../model/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  errorMsg: string = '';
  loading: boolean = false;
  payload!: login
  onboardStatus: string = '';
  hide = true;

  constructor(private fb: FormBuilder, private app: AppService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm()
    this.app.exit()
  }

  initializeForm(){
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required],
    });
  }

  login(){
    let form = this.loginForm
    this.errorMsg = ''
    this.loading = true

    this.payload = {
      email: form.get('email')?.value,
      password: form.get('password')?.value
    }

    this.app.authService.login(this.payload)
    .subscribe({
      next: (res: any) => {
      this.loading = false
        this.loading = false
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.app.utilities.saveToStore(Constant.USER, res)
        this.onboardStatus = res['user'].onboarded
        this.onboardStatus ? this.router.navigateByUrl("/app") : this.router.navigateByUrl("/onboarding")
      },

      error: (error) => {
        this.loading = false
        
        this.errorMsg = typeof error == 'string' ? error : error.message
      }
    });
  }

}
