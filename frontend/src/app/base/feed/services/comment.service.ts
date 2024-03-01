import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseUrlService } from 'src/app/services/base-url.service';
import { createComments, fetchComments } from '../models/comment.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url:string = this.base._baseUrl

  constructor( private http:HttpClient, private base:BaseUrlService) { }

  fetchComments(payload: fetchComments):Observable<fetchComments>{
    return this.http.post<any>(this.url + 
      `comment/fetch-comments`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  createComments(payload: createComments):Observable<createComments>{
    return this.http.post<any>(this.url + 
      `comment/create-comment`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }
}
