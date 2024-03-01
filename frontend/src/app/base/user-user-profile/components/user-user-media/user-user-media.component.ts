import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { viewProfile } from 'src/app/base/profile/models/profile.model';
import { ImageViewComponent } from 'src/app/general-components/image-view/image-view.component';
import { Constant } from 'src/app/resources/constants/constants';

@Component({
  selector: 'app-user-user-media',
  templateUrl: './user-user-media.component.html',
  styleUrls: ['./user-user-media.component.scss']
})
export class UserUserMediaComponent implements OnInit {
  selected: string = 'main'
  message: string = ''
  loading:boolean = false;
  payload!:viewProfile;
  feedList: any[]=[]
  newArray: any[]=[]
  error: boolean = false;
  time: string = ''
  start: number = 0
  moreLoading: boolean = false;
  newStart: number = 0;
  newError: boolean = false;
  isEmptyList: boolean = false;
  imageUrl: string = Constant.IMAGE_URL
  videoUrl: string = Constant.VIDEO_URL
  postUrl: string = Constant.POST_URL
  @Input() userData: any;
  listData: any[] = []

  constructor(private app: AppService, private dialog: MatDialog) {
    this.app.getScrollPosition().subscribe((el)=>{
      this.onScroll(el)
    })
   }

  ngOnInit(): void {
    this.getFeed();
  }

  reloadFeed(reload: string){
    console.log('did it work');
    
    if(reload == 'success'){
    console.log('check again');
      this.getFeed()
    }
  }

  displayImage(image: any){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.minWidth = "60%";
    dialogConfig.minHeight = "90vh"
    dialogConfig.panelClass = 'image-popup';
    dialogConfig.data = image;
    this.dialog
      .open(ImageViewComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {

      });
  }


  getFeed(){
    this.loading = true
    this.payload = {
      user_id: this.userData?.user ? this.userData?.user?.id : this.userData?.school?.id,
      user_type: this.userData?.user ? this.userData?.user?.user_type : this.userData?.school?.user_type,
      visitor_id: this.app.utilities.getUserId(),
      visitor_type: this.app.utilities.getUserType(),
      start: this.start,
      length: Constant.MEDIA_SIZE
    }
    
    this.app.profileService.viewProfile(this.payload)
    .subscribe({
      next: (res: any) => {
        this.message = ''
        this.loading = false
        this.listData = res.feeds
        console.log(this.listData, 'the data');
        
        this.listData.map((el: any) => {
          if(el.image){
            el.image.map((e: any)=> {
              this.feedList.push({type: 'image', image: e})
            })
          }
          if(el.video){
            this.feedList.push({type: 'video', video: el.video})
          }
        })
        console.log(this.feedList, 'feed');
        
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = error
      }
    });
  }

  onScroll(event: any) {   
    if (event.offset + event.scroll >= event.height) {
      this.newError = false
      this.newStart += 50

      if(!this.isEmptyList){
        this.moreLoading = true
        this.payload = {
          user_id: this.userData?.user ? this.userData?.user?.id : this.userData?.school?.id,
          user_type: this.userData?.user ? this.userData?.user?.user_type : this.userData?.school?.user_type,
          visitor_id: this.app.utilities.getUserId(),
          visitor_type: this.app.utilities.getUserType(),
          start: this.newStart,
          length: Constant.MEDIA_SIZE
        }
        this.app.profileService.viewProfile(this.payload)
        .subscribe({
          next: (res: any) => {
            this.message = ''
            this.newArray = res.feeds
            this.moreLoading = true
            if(this.newArray.length == 0){
              console.log('stop');
              this.moreLoading = false
              this.isEmptyList = true
            }
            
            else{
              this.isEmptyList = false
              for (let i = 0; i < this.newArray.length; i++) {
                this.feedList.push(res[i]) 
              }
            }
            
          },
    
          error: (error) => {
            this.moreLoading = true
            this.newError = true
            this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
              duration:Constant.TIMEOUT_DURATION
            })
          }
        });
      }

      else{
        this.app.snackbar.open('No more media',  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
      
    }
  }

}
