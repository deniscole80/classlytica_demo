import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseUrlService } from 'src/app/services/base-url.service';
import { AppService } from "src/app/app.service";
import { login, passwordResetLink, registerSchool, registerUser, setPassword, verifyCode, verifyEmail, verifyResetLink } from '../model/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = this.base._baseUrl

  constructor( private http:HttpClient, private base:BaseUrlService) { }

  verifyEmail(payload:verifyEmail):Observable<verifyEmail>{
    return this.http.post<any>(this.url + 
      `auth/verify-email`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  registerSchool(payload:registerSchool):Observable<registerSchool>{
    return this.http.post<any>(this.url + 
      `auth/register`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  verifyCode(payload:verifyCode):Observable<verifyCode>{
    return this.http.post<any>(this.url + 
      `auth/verify-code`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  login(payload:login):Observable<login>{
    return this.http.post<any>(this.url + 
      `auth/login`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  passwordResetLink(payload:passwordResetLink):Observable<passwordResetLink>{
    return this.http.post<any>(this.url + 
      `auth/reset-link`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  verifyResetLink(payload:verifyResetLink):Observable<verifyResetLink>{
    return this.http.post<any>(this.url + 
      `auth/verify-reset-link`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  registerUser(payload:registerUser):Observable<registerUser>{
    return this.http.post<any>(this.url + 
      `auth/register`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  setPassword(payload:setPassword, token: string):Observable<setPassword>{
    return this.http.post<any>(this.url + 
      `auth/set-password`, payload, {headers: new HttpHeaders({'Authorization': `Bearer ${token}`})})
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

}
