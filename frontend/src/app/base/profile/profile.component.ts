import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { SetProfilePicComponent } from 'src/app/general-components/set-profile-pic/set-profile-pic.component';
import { setPic } from 'src/app/onboarding/models/onboarding.model';
import { Constant } from 'src/app/resources/constants/constants';
import { viewProfile } from './models/profile.model';
// import {convert} from 'image-file-resize';
const convert = require('client-side-image-resize');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fileSystemImage: any = '';
  backgroundImage: any = this.app.utilities.getUserHeaderImage();
  imageLoad!: setPic
  headerLoading: boolean = true;
  selectedImage: any = "";
  profileImage: any = this.app.utilities.getUserProfileImage();
  loading: boolean = false;
  selectImage: boolean = false;
  File!: File;
  imageUrl = Constant.IMAGE_URL

  // profileImage: any;
  // backgroundImage: any;

  constructor( private app: AppService, private dialog: MatDialog,) { 
    let payload: viewProfile = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      start: 0,
      length: 10
    }
    
    this.app.profileService.viewProfile(payload)
    .subscribe({
      next: res=>{
        console.log(res, 'profile');
        
      }
    })
  }

  ngOnInit(): void {
    // this.app.getHeaderPic().subscribe((el)=>{
    //   this.backgroundImage = el
    //   console.log(this.backgroundImage, 'back');
    // })

    // this.app.getPicture().subscribe((el)=>{
    //   this.profileImage = el
    // })
  }

  onScroll(event: any){
    let scrollData = {
      offset: event.target.offsetHeight,
      scroll: event.target.scrollTop,
      height: event.target.scrollHeight
    }

    this.app.setScrollPosition(scrollData)
  }

  checkImage(image: any){
    this.backgroundImage = null
    this.File = image
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.fileSystemImage = reader.result;
      },
      false
    );
    if (this.File) {
      reader.readAsDataURL(this.File);
    }
    this.setHeader()
  }

  setImage(image: any){
    convert({ 
      file: image.target.files[0],  
      width: 600, 
      height: 400, 
      type: 'jpeg'
      }).then((resp: any) => {
        console.log(resp, 'what is image');
        this.checkImage(resp)
          // Response contain compressed and resized file
      }).catch((error: any) => {
           // Error
        console.log(error, 'what is error image');

      })
  }

  setHeader(){
    this.headerLoading = true
    this.app.snackbar.open('Setting Profile Header....',  'Dismiss', {
      duration:Constant.TIMEOUT_DURATION
    })

    let formData = new FormData();
    formData.append('file', this.File, this.File.name)
    formData.append('email', this.app.utilities.getUserEmail())
    formData.append('user_id', this.app.utilities.getUserId())
    formData.append('img_type', 'c')

    this.app.onboardingService.setPic(formData)
    .subscribe({
      next: (res: any) => {
        this.headerLoading = false
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.backgroundImage = res.img        
        this.app.setHeaderPic(res.img)

      },

      error: (error) => {
        this.headerLoading = false
        this.app.snackbar.open(error,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
  }

  selectPicture(){
    this.selectImage = true
    // let dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '80%';
    // dialogConfig.minHeight = '32vh';
    // dialogConfig.panelClass = 'custom-popup';
    // dialogConfig.position = {bottom: '0%'}
    // dialogConfig.disableClose = true;
    // this.dialog
    //   .open(SetProfilePicComponent, dialogConfig)
    //   .afterClosed()
    //   .subscribe((res: any) => { 
    //     if(res){
    //       this.selectedImage = res
    //       this.setProfilePic()
    //     }
    //   });
  }

  selectImages(event: any){
    if (event == 'close') {
      this.selectImage = false
    }else{
      this.profileImage = null
      this.File = event
      // this.profileImage = event.name
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          this.selectedImage = reader.result;
        },
        false
      );
      if (this.File) {
        reader.readAsDataURL(this.File);
      }
      this.setProfilePic()
    }
  }

  setProfilePic(){
    this.loading = true
    this.app.snackbar.open('Setting Profile Picture....',  'Dismiss', {
      duration:Constant.TIMEOUT_DURATION
    })

    let file: File = this.File


    let formData = new FormData();
    formData.append('file', file, file.name)
    formData.append('email', this.app.utilities.getUserEmail())
    formData.append('user_id', this.app.utilities.getUserId())
    formData.append('img_type', 'p')


    this.app.onboardingService.setPic(formData)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.profileImage = res.img
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.app.setProfilePic(res.img)
      },

      error: (error) => {
        this.loading = false
        this.app.snackbar.open(error,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
    
  }
  


}
