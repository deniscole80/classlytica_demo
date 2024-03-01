import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { BaseUrlService } from 'src/app/services/base-url.service';
import { acceptRequest, assignRole, createClassroom, createRole, createSubject, declineRequest, editRoles, employmentRequest, employmentRequestaction, fetchAllParents, fetchAllStaff, fetchClassroom, fetchClassStudents, fetchParent, fetchRequest, fetchRoles, fetchSchoolStudents, fetchStudentTeacher, fetchSubjects, searchParent, searchSchoolStaff, searchStudent, searchUser, studentParentGroup } from '../models/management.model';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  url:string = this.base._baseUrl

  constructor( private http:HttpClient, private base:BaseUrlService) { }

    ////student endpoints
  
  fetchSchoolStudents(payload: fetchSchoolStudents):Observable<fetchSchoolStudents>{
    return this.http.post<any>(this.url + 
      `school/fetch-school-students`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }
  
  fetchClassStudents(payload: fetchClassStudents):Observable<fetchClassStudents>{
    return this.http.post<any>(this.url + 
      `school/fetch-class-students`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  createStudent(payload: FormData):Observable<FormData>{
    return this.http.post<any>(this.url + 
      `school/create-student`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  searchStudent(payload: searchStudent):Observable<searchStudent>{
    return this.http.post<any>(this.url + 
      `school/search-student`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  fetchStudentParent(payload: fetchParent):Observable<fetchParent>{
    return this.http.post<any>(this.url + 
      `school/fetch-student-parent`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  fetchStudentTeacher(payload: fetchStudentTeacher):Observable<fetchStudentTeacher>{
    return this.http.post<any>(this.url + 
      `school/fetch-student-teacher`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  ////classroom endpoints

  createClassroom(payload: createClassroom):Observable<createClassroom>{
    return this.http.post<any>(this.url + 
      `school/create-classroom`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  fetchClassroom(payload: fetchClassroom):Observable<fetchClassroom>{
    return this.http.post<any>(this.url + 
      `school/fetch-classrooms`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  /////subject endpoints

  createSubject(payload: createSubject):Observable<createSubject>{
    return this.http.post<any>(this.url + 
      `school/create-subject`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  fetchSubjects(payload: fetchSubjects):Observable<fetchSubjects>{
    return this.http.post<any>(this.url + 
      `school/fetch-subjects`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  ////staffs endpoints

  searchUser(payload: searchUser): Observable<searchUser>{
    return this.http.post<any>(this.url +
      `school/search`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  searchStaff(payload: searchSchoolStaff): Observable<searchSchoolStaff>{
    return this.http.post<any>(this.url +
      `school/search-staff`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  employmentRequest(payload: employmentRequest): Observable<any>{
    return this.http.post<any>(this.url +
      `school/employment-request`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  EmploymentRequestAction(payload: employmentRequestaction): Observable<any>{
    return this.http.post<any>(this.url +
      `school/employment-request`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }

  fetchEmploymentRequest(payload: fetchRequest): Observable<fetchRequest>{
    return this.http.post<any>(this.url +
      `school/fetch-employment-requests`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    )
  }
  
  acceptEmploymentRequest(payload: acceptRequest):Observable<any>{
    return this.http.post<any>(this.url + 
      `school/employment-request`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }
  
  declineEmploymentRequest(payload: declineRequest):Observable<any>{
    return this.http.post<any>(this.url + 
      `school/employment-request`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  fetchAllStaff(payload: fetchAllStaff):Observable<fetchAllStaff>{
    return this.http.post<any>(this.url + 
      `school/fetch-all-staffs`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  ////Parent Endpoints

  studentParentGroup(payload: studentParentGroup):Observable<studentParentGroup>{
    return this.http.post<any>(this.url + 
      `school/student-parent-group`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  fetchAllParents(payload: fetchAllParents):Observable<fetchAllParents>{
    return this.http.post<any>(this.url + 
      `school/fetch-all-parents`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  } 

  searchParent(payload: searchParent):Observable<searchParent>{
    return this.http.post<any>(this.url + 
      `school/search-parent`, payload)
    .pipe(
      catchError( err => this.base.errorHandler(err))
    ) 
  }

  //Role Management Endpoints
  createRoles(payload: createRole): Observable<createRole>{
    return this.http.post<any>(this.url +
      `school/create-role`, payload)
      .pipe(
        catchError( err => this.base.errorHandler(err))
      )
  }

  fetchRoles(payload: fetchRoles): Observable<fetchRoles>{
    return this.http.post<any>(this.url +
      `school/fetch-roles`, payload)
      .pipe(
        catchError( err => this.base.errorHandler(err))
      )
  }

  assignRole(payload: assignRole): Observable<any>{
    return this.http.post<any>(this.url +
      `school/assign-role`, payload)
      .pipe(
        catchError( err => this.base.errorHandler(err))
      )
  }

  editRoles(payload: editRoles): Observable<editRoles>{
    return this.http.post<any>(this.url +
      `school/edit-role`, payload)
      .pipe(
        catchError( err => this.base.errorHandler(err))
      )
  }

}
