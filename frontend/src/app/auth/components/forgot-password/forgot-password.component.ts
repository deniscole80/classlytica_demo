import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { passwordResetLink } from '../../model/auth.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup
  loading: boolean = false;
  payload!: passwordResetLink
  errorMsg: string = '';
    hide = true;

  constructor(private fb: FormBuilder, private app: AppService, private router: Router) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
    });
  }

  sendMail(){
    let form = this.forgotForm
    this.errorMsg = ''
    this.loading = true

    this.payload = {
      email: form.get('email')?.value,
    }

    this.app.authService.passwordResetLink(this.payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        if (res['message'] == 'sent') {
          this.loading = false
          this.app.snackbar.open(res['message'],  'Dismiss', {
            duration:Constant.TIMEOUT_DURATION
          })
          this.router.navigateByUrl("/email-success")
        }

        else {
          this.loading = false
          this.errorMsg = res['message']
        }
      },

      error: (error) => {
        this.loading = false
        this.errorMsg = typeof error == 'string' ? error : error.message
      }
    });
  }

}
