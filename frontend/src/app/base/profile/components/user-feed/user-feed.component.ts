import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { CommentPostComponent } from 'src/app/base/feed/components/comment-post/comment-post.component';
import { fetchFeed, fetchMyFeed, likePost, sharePost } from 'src/app/base/feed/models/feed.model';
import { ImageViewComponent } from 'src/app/general-components/image-view/image-view.component';
import { Constant } from 'src/app/resources/constants/constants';
import { time_ago } from 'src/app/resources/constants/date-format';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit {
  selected: string = 'main'
  message: string = ''
  loading:boolean = false;
  payload!:fetchMyFeed;
  feedList: any[]=[]
  newArray: any[]=[]
  error: boolean = false;
  likeLoad!: likePost;
  shareLoad!: sharePost;
  time: string = ''
  start: number = 0
  moreLoading: boolean = false;
  newStart: number = 0;
  newError: boolean = false;
  isEmptyList: boolean = false;
  imageUrl: string = Constant.IMAGE_URL
  postUrl: string = Constant.POST_URL
  videoUrl: string = Constant.VIDEO_URL
  defaultPic: string = 'assets/images/nomad.svg'
  username = this.app.utilities.getUserName();
  firstName = this.app.utilities.getUserFirstName();
  lastName = this.app.utilities.getUserLastName();
  profileImage = this.app.utilities.getUserProfileImage();


  @Input() scroll: any;
  constructor(
    private app: AppService,
    private dialog: MatDialog,
    private router: Router
    ) { 
      this.app.getScrollPosition().subscribe((el)=>{
        this.onScroll(el)
      })
    }

  ngOnInit(): void {
    this.getFeed();
    console.log(this.time, 'the time');
    
  }

  selectType(type: any){
    console.log(type, 'the type');
    
    if(type?.type == 'video'){
      this.selected = 'video'
      this.message = type?.message

    }

    else if(type?.type == 'photo'){
      this.selected = 'photo'
      this.message = type?.message
    }

    else if(type?.type == 'comment'){
      this.selected = 'comment'
    }

    else{
      this.selected = 'main'
    }
  }

  reloadFeed(reload: string){
    console.log('did it work');
    
    if(reload == 'success'){
    console.log('check again');
      this.getFeed()
    }
  }

  getFeed(){
    this.loading = true
    this.payload = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      start: this.start,
      length: Constant.MINI_SIZE
    }
    
    console.log(this.payload, 'the payload');
    

    this.app.feedService.fetchMyFeed(this.payload)
    .subscribe({
      next: (res: any) => {
        this.message = ''
        console.log(res, 'response');
        this.loading = false
        this.feedList = res
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = error
      }
    });
  }

  likePost(feed: any){
    console.log(feed, 'the feed');
    this.likeLoad = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      post_id: feed.id,
      poster_id: feed?.user_id,
      poster_type: feed?.user_type
    }

    this.app.feedService.likePost(this.likeLoad)
    .subscribe({
      next: (res: any) => {     
        if(res['message'] == 'Liked')  {
          feed.likes = feed?.likes + 1
          feed.liked_post = true
        }

        else{
          feed.likes = feed?.likes - 1
          feed.liked_post = false
        }
      },

      error: (error) => {
        this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
  }

  displayImage(image: any){
    console.log(image, 'the image');
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

  sharePost(feed: any){
    console.log(feed, 'the feed');
    this.shareLoad = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      post_id: feed?.id,
      username: this.app.utilities.getUserName()
    }

    this.app.feedService.sharePost(this.shareLoad)
    .subscribe({
      next: (res: any) => {     
        if(res['message'] == 'Shared')  {
          feed.shares = feed?.shares + 1
          feed.shared_post = true
          this.app.snackbar.open(res['message'],  'Dismiss', {
            duration:Constant.TIMEOUT_DURATION
          })
        }

        else{
          feed.shares = feed?.shares - 1
          feed.shared_post = false
        }
      },

      error: (error) => {
        this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
  }

  commentPost(feed: any){
    if(feed?.user == null){   
      feed.user = {
      username: this.app.utilities.getUserName(),
      first_name: this.app.utilities.getUserFirstName(),
      last_name: this.app.utilities.getUserLastName(),
      profile_img: this.app.utilities.getUserProfileImage(),
      id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
    }
    }

    console.log(feed, 'the feed');
    

    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.maxHeight = "95vh"
    dialogConfig.data = feed;
    this.dialog
      .open(CommentPostComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {

      });
  }

  getTime(time: any){
    return time_ago(time)
  }

  onScroll(event: any) {   
    console.log(event.offset + event.scroll, 'height');
    console.log(event.height, 'equal');
    if (event.offset + event.scroll >= event.height) {
      console.log("End");
      console.log(event.offset + event.scroll, 'height');
      console.log(event.height, 'equal');
      this.newError = false
      this.newStart += 10

      if(!this.isEmptyList){
        this.moreLoading = true
        this.payload = {
          user_id: this.app.utilities.getUserId(),
          user_type: this.app.utilities.getUserType(),
          start: this.newStart,
          length: Constant.MINI_SIZE
        }
        this.app.feedService.fetchMyFeed(this.payload)
        .subscribe({
          next: (res: any) => {
            this.message = ''
            this.newArray = res
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
        this.app.snackbar.open('No more feed',  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
      
    }
  }

}
