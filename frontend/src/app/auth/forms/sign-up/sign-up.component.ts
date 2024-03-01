import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { Util } from 'src/app/resources/helpers/utilities';
import { registerUser, verifyEmail } from '../../model/auth.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  countries = Util.countries
  signupForm!:FormGroup;
  loading: boolean = false;
  payload!: verifyEmail
  userLoad!: registerUser
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private app: AppService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      othernames: [''],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      individual: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      phonenumber: ['', Validators.required],
    });
  }

  addAccount(){
    let form = this.signupForm
    this.errorMsg = ''
    this.loading = true

    this.payload = {
      email: form.get('email')?.value,
      username: form.get('username')?.value,
    }

    this.userLoad = {
      user_type: 2,
      first_name: form.get('firstname')?.value,
      last_name: form.get('lastname')?.value,
      username: form.get('username')?.value,
      other_name: form.get('othernames')?.value == '' ? form.get('othernames')?.value : null,
      gender: form.get('gender')?.value,
      country: form.get('country')?.value,
      status: form.get('individual')?.value,
      email: form.get('email')?.value,
      phone_number: form.get('phonenumber')?.value,
    }

    this.app.authService.verifyEmail(this.payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        if (res['message'] == 'Verification email sent') {
          this.loading = false
          this.app.snackbar.open(res['message'],  'Dismiss', {
            duration:Constant.TIMEOUT_DURATION
          });
          localStorage.setItem('account details', JSON.stringify(this.userLoad));
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
