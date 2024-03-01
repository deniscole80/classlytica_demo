import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseUrlService } from 'src/app/services/base-url.service';
import { commentNotification, employmentNotification, followNotification, likeNotification, shareNotification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url:string = this.base._baseUrl

  constructor( private http:HttpClient, private base:BaseUrlService) { }

  likeNotification(payload: likeNotification):Observable<likeNotification>{
    return this.http.post<any>(this.url + 
      `notification/get-like-notifications`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  shareNotification(payload: shareNotification):Observable<shareNotification>{
    return this.http.post<any>(this.url + 
      `notification/get-share-notifications`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  employmentRequestNotification(payload: employmentNotification):Observable<shareNotification>{
    return this.http.post<any>(this.url + 
      `notification/employment-request-notifications`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  followNotification(payload: followNotification):Observable<followNotification>{
    return this.http.post<any>(this.url + 
      `notification/get-follow-notifications`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  commentNotification(payload: commentNotification):Observable<commentNotification>{
    return this.http.post<any>(this.url + 
      `notification/get-comment-notifications`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }
}
