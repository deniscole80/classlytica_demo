import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseUrlService } from 'src/app/services/base-url.service';
import { searchUser } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url:string = this.base._baseUrl

  constructor( private http:HttpClient, private base:BaseUrlService) { }

  searchUser(payload: searchUser):Observable<searchUser>{
    return this.http.post<any>(this.url + 
      `user/search-user`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }
  
}
