import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';

@Component({
  selector: 'app-view-kids',
  templateUrl: './view-kids.component.html',
  styleUrls: ['./view-kids.component.scss']
})
export class ViewKidsComponent implements OnInit {
  innerHeight = window.innerHeight - (160);
  imgUrl = Constant.IMAGE_URL

  constructor(
    @Inject(MAT_DIALOG_DATA) public kidData:any,
    private dialog: MatDialog,
    private router: Router,
    private app: AppService,
  ) { }

  ngOnInit(): void {
  }

  viewKid(kid: any){
    this.router.navigate(['app/student-profile'], {queryParams: {type: 'student', classId: kid.class_id, schoolId: kid.school_id, id: kid.id}})
    this.dialog.closeAll()
  }

}
