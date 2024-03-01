import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { verifyCode } from '../../model/auth.model';

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.scss']
})
export class ConfirmOtpComponent implements OnInit {
  pinArray: number[] = []
  pin: string = '';
  loading: boolean = false;
  pinLoad!: verifyCode;
  accountDetails!: any
  data!: any;
  @ViewChild("myInput") private _inputElement!: ElementRef;
  @ViewChild("#otherInput") private otherElem!: ElementRef;

  constructor(private router: Router, private app: AppService) {
    this.accountDetails = localStorage.getItem(Constant.USERDETAILS)
    this.data = JSON.parse(this.accountDetails)

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._inputElement.nativeElement.focus();
  }

  nextInput(event: any, position: number) {

    this.pinArray = this.pinArray.filter(n => n)
    if (position == 6 && this.pinArray.length == 6) {
      
      this.nextPage()
    }

    let element;

    if (!event.code.includes('Digit') && !event.code.includes('Backspace')) {
      return;
    }
    if (event.code !== 'Backspace')
      element = event.srcElement.nextElementSibling;

    if (event.code === 'Backspace')
      element = event.srcElement.previousElementSibling;

    if (event.code === 'Space')
      return;
    
    if (element == null)
      return;


    else
      element.focus();

  }

  nextPage() {
    this.pin = this.pinArray.join('')
    this.loading = true
    
    // this.otherElem.nativeElement.disable()
    // this._inputElement.nativeElement.disable()

    this.pinLoad = {
      email: this.data?.email,
      code: this.pin
    }

    this.app.authService.verifyCode(this.pinLoad)
      .subscribe({
        next: (res: any) => {
          this.loading = false
          if (res['message'] == 'valid') {
            this.loading = false
            this.app.snackbar.open(res['message'], 'Dismiss', {
              duration: Constant.TIMEOUT_DURATION
            })
            this.router.navigateByUrl('/activation')
          }

          else {
            this.loading = false
            this.app.snackbar.open(res['message'], 'Dismiss', {
              duration: Constant.TIMEOUT_DURATION
            })
          }
        },

        error: (error) => {
          this.loading = false
          this.app.snackbar.open(typeof error == 'string' ? error : error.error, 'Dismiss', {
            duration: Constant.TIMEOUT_DURATION
          })
        }
      });
  }

}
