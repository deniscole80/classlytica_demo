import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommentUploadComponent } from 'src/app/base/feed/components/comment-upload/comment-upload.component';
import { Constant } from 'src/app/resources/constants/constants';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.scss']
})
export class ImageViewComponent implements OnInit {
  imgUrl = Constant.POST_URL

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CommentUploadComponent>) { }

  ngOnInit(): void {
    console.log(this.data, "the data");
    
  }

  closeDialog(){
    this.dialogRef.close()
  }
}
