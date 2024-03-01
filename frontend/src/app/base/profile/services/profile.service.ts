import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseUrlService } from 'src/app/services/base-url.service';
import { completeUserProfile, createCv, editSchoolProfile, editUserProfile, fetchMyKids, myFollowers, myFollowings, profileComplete, viewCv, viewProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url:string = this.base._baseUrl

  constructor( private http:HttpClient, private base:BaseUrlService) { }

  profileComplete(payload:profileComplete):Observable<profileComplete>{
    return this.http.post<any>(this.url + 
      `user/profile-complete`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  myFollowings(payload:myFollowings):Observable<myFollowings>{
    return this.http.post<any>(this.url + 
      `user/my-followings`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  myFollowers(payload:myFollowers):Observable<myFollowers>{
    return this.http.post<any>(this.url + 
      `user/my-followers`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  viewCv(payload:viewCv):Observable<viewCv>{
    return this.http.post<any>(this.url + 
      `user/view-cv`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  createCv(payload:createCv):Observable<createCv>{
    return this.http.post<any>(this.url + 
      `user/create-cv`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  editUserProfile(payload:editUserProfile):Observable<editUserProfile>{
    return this.http.post<any>(this.url + 
      `user/edit-profile`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  editSchoolProfile(payload:editSchoolProfile):Observable<editSchoolProfile>{
    return this.http.post<any>(this.url + 
      `user/edit-profile`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  completeUserProfile(payload:completeUserProfile):Observable<completeUserProfile>{
    return this.http.post<any>(this.url + 
      `user/complete-user-profile`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  viewProfile(payload:viewProfile):Observable<viewProfile>{
    return this.http.post<any>(this.url + 
      `user/view-profile`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  fetchMyKids(payload:fetchMyKids):Observable<fetchMyKids>{
    return this.http.post<any>(this.url + 
      `user/fetch-my-kids`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }


}
