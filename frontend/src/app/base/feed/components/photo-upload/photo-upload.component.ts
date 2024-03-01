import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { createImagePostCaption } from '../../models/feed.model';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent implements OnInit {
  @Output() type = new EventEmitter<string>();
  @Output() reload = new EventEmitter<string>();
  @Input() message: string = '';
  payload!: createImagePostCaption; 
  @ViewChild("myInput") private _inputElement!: ElementRef;
  @ViewChild("#otherInput") private otherElem!: ElementRef;
  
  imageList: any[] = [
    { defaultImg: 'assets/images/upload.svg', imgName: '', file: '' },
    // { defaultImg: 'assets/images/upload.svg', imgName: '', file: '' },
    // { defaultImg: 'assets/images/upload.svg', imgName: '', file: '' },
    // { defaultImg: 'assets/images/upload.svg', imgName: '', file: '' },
  ];
  finalImages: any[]=[]
  fileSystemImage: any;
  loading: boolean = false;

  constructor(private app: AppService) { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this._inputElement.nativeElement.focus();
  }

  closeText(){
    this.type.emit('main')
  }

  setImage(image: any, selected: any){
    // this.fileSystemImage = selectedImage
    let file: File = image.target.files[0]
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        selected.imgName = reader.result;
        if(this.imageList.length < 4 && selected.file == ''){
          this.imageList.push({ defaultImg: 'assets/images/upload.svg', imgName: '', file: '' })
        }
        selected.file = file
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  addPost(){
    this.loading = true

    let formData = new FormData();

    for (let i = 0; i < this.imageList.length; i++) {
      if(this.imageList[i].imgName != ''){
        formData.append('file', this.imageList[i].file, this.imageList[i].file.name)
        this.finalImages.push(this.imageList[i].imgName);
      }
    }

    formData.append('text', this.message)
    formData.append('user_id', this.app.utilities.getUserId())
    formData.append('user_type', this.app.utilities.getUserType())

    this.app.feedService.createImagePost(formData)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.type.emit( 'main')
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

  cancel(image: any){
    this.imageList.splice(image, 1)
  }
}
