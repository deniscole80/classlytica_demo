import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseUrlService } from 'src/app/services/base-url.service';
import { createImagePost, createImagePostCaption, createTextPost, createVideoPost, createVideoPostCaption, fetchFeed, fetchFeeds, fetchMyFeed, likePost, sharePost } from '../models/feed.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  url:string = this.base._baseUrl

  constructor( private http:HttpClient, private base:BaseUrlService) { }

  fetchFollowSuggestions(payload: fetchFeeds):Observable<fetchFeeds>{
    return this.http.post<any>(this.url + 
      `post/fetch-feeds`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  createTextPost(payload:createTextPost):Observable<createTextPost>{
    return this.http.post<any>(this.url + 
      `post/create-text-post`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  createImagePost(payload:FormData):Observable<any>{
    return this.http.post<any>(this.url + 
      `post/create-post`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  createImagePostCaption(payload:createImagePostCaption):Observable<createImagePostCaption>{
    return this.http.post<any>(this.url + 
      `post/create-post`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  createVideoPost(payload:FormData):Observable<any>{
    return this.http.post<any>(this.url + 
      `post/create-video-post`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  createVideoPostCaption(payload:createVideoPostCaption):Observable<createVideoPostCaption>{
    return this.http.post<any>(this.url + 
      `post/create-post`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  likePost(payload:likePost):Observable<likePost>{
    return this.http.post<any>(this.url + 
      `post/like-post`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  sharePost(payload:sharePost):Observable<sharePost>{
    return this.http.post<any>(this.url + 
      `post/share-post`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  fetchFeed(payload:fetchFeed):Observable<fetchFeed>{
    return this.http.post<any>(this.url + 
      `post/fetch-feeds`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  fetchMyFeed(payload:fetchMyFeed):Observable<fetchMyFeed>{
    return this.http.post<any>(this.url + 
      `post/fetch-my-feeds`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

}
