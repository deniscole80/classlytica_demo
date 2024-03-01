import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constant } from '../resources/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  _baseUrl: string = "http://20.74.128.128:3000/api/v1/"
  _imageUrl: string = "https://classlyticadev.blob.core.windows.net/profile/"

  constructor(private router: Router, private snackbar: MatSnackBar) { }

  /**
  * Contructs proper error message and rethrows error
  *  @param {any} err Error Object.
  * @returns {Observable<never>} Returns an observable.
  */

  errorHandler(err: HttpErrorResponse) {
    let errorMessage: string;
    
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error?.message}`;
    } else {
      errorMessage = err.error.message;
    }

    if(errorMessage == 'Bad authentication' || errorMessage == 'No authentication'){
      this.snackbar.open(errorMessage, 'Dismiss',{
        duration: Constant.TIMEOUT_DURATION
      });
      localStorage.clear();
      this.router.navigateByUrl('/');
    }
    return throwError(() => errorMessage);
  }
}
 