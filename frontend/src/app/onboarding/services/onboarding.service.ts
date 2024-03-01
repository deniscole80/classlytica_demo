import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseUrlService } from 'src/app/services/base-url.service';
import { fetchFollowSuggestions, finishOnboarding, followUser, setPic, setUserInterests } from '../models/onboarding.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {
  url:string = this.base._baseUrl

  constructor( private http:HttpClient, private base:BaseUrlService) { }

  fetchAllInterests():Observable<any>{
    return this.http.post<any>(this.url + 
      `auth/fetch-all-interests`, '')
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  fetchFollowSuggestions(payload: fetchFollowSuggestions):Observable<fetchFollowSuggestions>{
    return this.http.post<any>(this.url + 
      `user/follow-suggestions`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  setUserInterests(payload:setUserInterests):Observable<setUserInterests>{
    return this.http.post<any>(this.url + 
      `auth/set-user-interests`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  setPic(payload: FormData):Observable<setPic>{
    return this.http.post<any>(this.url + 
      `auth/set-pic`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  followUser(payload:followUser):Observable<followUser>{
    return this.http.post<any>(this.url + 
      `user/follow-user`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  finishOnboarding(payload:finishOnboarding):Observable<finishOnboarding>{
    return this.http.post<any>(this.url + 
      `auth/finish-onboarding`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }


}
