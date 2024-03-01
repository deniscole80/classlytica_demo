import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { createVideoPostCaption } from '../../models/feed.model';

@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent implements OnInit {
  @Output() type = new EventEmitter<string>();
  @Output() reload = new EventEmitter<string>();
  @Input() message: string = '';
  fileSystemImage: any;
  loading: boolean = false;
  payload!: createVideoPostCaption;
  file!: File;
  @ViewChild("myInput") private _inputElement!: ElementRef;
  @ViewChild("#otherInput") private otherElem!: ElementRef;

  constructor(private app: AppService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._inputElement.nativeElement.focus();
  }

  closeText(){
    this.type.emit('main')
  }

  setVideo(image: any){
    
    let file: File = image.target.files[0]
    this.file = file
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.fileSystemImage = reader.result;

      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  addPost(){
    this.loading = true

    this.payload = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      text: this.message,
      video: this.fileSystemImage
    }

    let formData = new FormData();

    formData.append('file', this.file, this.file.name)
    formData.append('text', this.message)
    formData.append('user_id', this.app.utilities.getUserId())
    formData.append('user_type', this.app.utilities.getUserType())
    

    this.app.feedService.createVideoPost(formData)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.type.emit('main')
        this.reload.emit('success')
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
