import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  empty: any = null

 patternValidator(): ValidatorFn {
   return (control: AbstractControl): { [key: string]: any } => {
     if(!control.value) {
       return this.empty;
     }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])');
      const valid = regex.test(control.value);
      return valid ? this.empty : { invalidPassword: true };
   }
 }
}
