import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-set-profile-pic',
  templateUrl: './set-profile-pic.component.html',
  styleUrls: ['./set-profile-pic.component.scss']
})
export class SetProfilePicComponent implements OnInit {
  selectedImage: string = "";
  fileSystemImage: any;
  @Output() image: EventEmitter<any> = new EventEmitter<any>();

  avatars: any[] = [
    {image: 'assets/images/avatar1.svg', value: 'assets/images/avatar1.png'},
    {image: 'assets/images/avatar2.svg', value: 'assets/images/avatar2.png'},
    {image: 'assets/images/avatar3.svg', value: 'assets/images/avatar3.png'},
    {image: 'assets/images/avatar4.svg', value: 'assets/images/avatar4.png'},
    {image: 'assets/images/avatar5.svg', value: 'assets/images/avatar5.png'},
    {image: 'assets/images/avatar6.svg', value: 'assets/images/avatar6.png'},
    {image: 'assets/images/avatar7.svg', value: 'assets/images/avatar7.png'},
    {image: 'assets/images/avatar8.svg', value: 'assets/images/avatar8.png'},
    {image: 'assets/images/avatar9.svg', value: 'assets/images/avatar9.png'},
    {image: 'assets/images/avatar10.svg', value: 'assets/images/avatar10.png'},
    {image: 'assets/images/avatar11.svg', value: 'assets/images/avatar11.png'},
    {image: 'assets/images/avatar12.svg', value: 'assets/images/avatar12.png'},
  ]
  baseImage: any;
  file!: any;

  constructor(
    private http: HttpClient
    ) { }

  ngOnInit(): void {
  }

  cancel(){
    this.image.emit('close')
    // this.dialogRef.close(this.fileSystemImage ? this.fileSystemImage : this.baseImage)
  }

  setDefault(event: any){
    console.log(event, 'check');
    
  }

  blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
}

  selectAvatar(selectedImage: string){
    this.selectedImage = selectedImage
    this.fileSystemImage = null
    let namearr = this.selectedImage.split('/')
    let name = namearr[namearr.length - 1]
    this.http.get(selectedImage, { responseType: 'blob' })
    .subscribe(res => {

      this.file = this.blobToFile(res, name)
      this.image.emit(this.file)

      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   var base64data = reader.result; 
      //   this.baseImage = base64data             
      // }

      // reader.readAsDataURL(res); 
    });
  }

  setImage(image: any){
    // this.fileSystemImage = selectedImage
    this.selectedImage = ""
    this.file = image.target.files[0]
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.fileSystemImage = reader.result;

      },
      false
    );
    if (this.file) {
      reader.readAsDataURL(this.file);
    }

    this.image.emit(this.file)
  }

}
