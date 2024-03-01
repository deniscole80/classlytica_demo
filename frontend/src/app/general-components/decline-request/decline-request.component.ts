import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-decline-request',
  templateUrl: './decline-request.component.html',
  styleUrls: ['./decline-request.component.scss']
})
export class DeclineRequestComponent implements OnInit {

  reason: string = '';

  constructor(private dialogRef: MatDialogRef<DeclineRequestComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close()
  }

  accept(){
    this.dialogRef.close(this.reason)
  }
}
