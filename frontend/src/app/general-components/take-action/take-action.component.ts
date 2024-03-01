import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Constant } from 'src/app/resources/constants/constants';

@Component({
  selector: 'app-take-action',
  templateUrl: './take-action.component.html',
  styleUrls: ['./take-action.component.scss']
})
export class TakeActionComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<TakeActionComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  action(){
    this.dialogRef.close(Constant.SUCCESS)
  }

  close(){
    this.dialogRef.close()
  }

}
