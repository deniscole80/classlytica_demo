import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { setPic } from '../../models/onboarding.model';
import { SetProfilePicComponent } from '../../../general-components/set-profile-pic/set-profile-pic.component';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  firstname: string = this.app.utilities.getUserFirstName();

  @Output() stepNumber = new EventEmitter<number>();
  fileSystemImage: any = 'assets/images/cover.png';
  selectedImage: any = "assets/images/avatar1.svg";
  selectedHeader: string = ""
  imageLoad!: setPic
  innerHeight = window.innerHeight - (450);
  avatars: string[] = [
    'assets/images/avatar1.svg', 'assets/images/avatar2.svg', 'assets/images/avatar3.svg', 
    'assets/images/avatar4.svg', 'assets/images/avatar5.svg', 'assets/images/avatar6.svg',
    'assets/images/avatar7.svg', 'assets/images/avatar8.svg', 'assets/images/avatar9.svg',
    'assets/images/avatar9.svg', 'assets/images/avatar11.svg', 'assets/images/avatar12.svg',
  ];
  loading: boolean = false;
  strippedImage: any;
  headerLoading: boolean = true;
  selectImage: boolean = false;
  File!: File;
  profileImage= this.app.utilities.getUserProfileImage();
  backgroundImage= this.app.utilities.getUserHeaderImage();
  imageUrl = Constant.IMAGE_URL

  constructor(
    private dialog: MatDialog,
    private app: AppService
    ) { }

  ngOnInit(): void {   
  }

  setImage(image: any){
    // this.fileSystemImage = selectedImage
    this.backgroundImage = null
    let file: File = image.target.files[0]
    this.File = <File>image.target.files[0];

    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.fileSystemImage = reader.result;
        this.setHeader()
        
      },
      false
    );
    if (file) {
      reader.readAsDataURL(file);
    }
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

  next(){
    this.stepNumber.emit(2)
  }

}
