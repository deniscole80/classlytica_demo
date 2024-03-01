import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { createTextPost } from '../../models/feed.model';

@Component({
  selector: 'app-comment-upload',
  templateUrl: './comment-upload.component.html',
  styleUrls: ['./comment-upload.component.scss']
})
export class CommentUploadComponent implements OnInit {
  @Output() type = new EventEmitter<{type: string, message: string}>();
  @Output() reload = new EventEmitter<string>();
  text: string = '';
  loading: boolean = false;
  payload!: createTextPost
  @ViewChild("myInput") private _inputElement!: ElementRef;
  @ViewChild("#otherInput") private otherElem!: ElementRef;

  constructor(private app: AppService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._inputElement.nativeElement.focus();
  }

  closeText(){
    this.type.emit({type: 'main', message: this.text})
  }

  addPhoto(){
    this.type.emit({type: 'photo', message: this.text})
  }

  addVideo(){
    this.type.emit({type: 'video', message: this.text})
  }

  addPost(){
    this.loading = true

    this.payload = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      text: this.text
    }

    this.app.feedService.createTextPost(this.payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.reload.emit('success')
        this.type.emit({type: 'main', message: ''})
        this.app.snackbar.open('Feed sucessfully posted',  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      },

      error: (error) => {
        this.loading = false
        this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
  }

}
