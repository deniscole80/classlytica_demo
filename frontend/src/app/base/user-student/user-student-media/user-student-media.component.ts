import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-student-media',
  templateUrl: './user-student-media.component.html',
  styleUrls: ['./user-student-media.component.scss']
})
export class UserStudentMediaComponent implements OnInit {

  feedList: any = [];
  loading: boolean = false
  error: boolean = false
  message: string = ''
  
  constructor() { }

  ngOnInit(): void {
  }

}
