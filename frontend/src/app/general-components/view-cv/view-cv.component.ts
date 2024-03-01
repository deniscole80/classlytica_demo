import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { viewCv } from 'src/app/base/profile/models/profile.model';
import { Constant } from 'src/app/resources/constants/constants';

@Component({
  selector: 'app-view-cv',
  templateUrl: './view-cv.component.html',
  styleUrls: ['./view-cv.component.scss']
})
export class ViewCvComponent implements OnInit {
  cvLoad: any;
  cvLoading: boolean = false;
  cvError: boolean = false;
  payload!: viewCv;
  message: string = '';


  constructor(
    private dialogRef:MatDialogRef<viewCv>, 
    private app: AppService,
    @Inject(MAT_DIALOG_DATA) public userData:any,
    ) { }

  ngOnInit(): void {
    this.retrieveCv()
  }

  retrieveCv(){
    this.cvLoading = true
    this.cvError = false

    this.payload = {
      user_id: this.userData.userid,
      user_type: this.userData.usertype
    }

    this.app.profileService.viewCv(this.payload)
    .subscribe({
      next: (res: any) => {
        this.cvLoading = false
        this.cvError = false
        this.cvLoad = res
      },

      error: (error) => {
        this.cvLoading = false
        this.cvError = true
        this.message = typeof error == 'string' ? error : error.error
      }
    });
  }


  closeModal(){
    this.dialogRef.close();
  }

}
