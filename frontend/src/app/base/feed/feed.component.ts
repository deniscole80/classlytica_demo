import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ImageViewComponent } from 'src/app/general-components/image-view/image-view.component';
import { Constant } from 'src/app/resources/constants/constants';
import { time_ago } from 'src/app/resources/constants/date-format';
import { CommentPostComponent } from './components/comment-post/comment-post.component';
import { fetchFeed, likePost, sharePost } from './models/feed.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  selected: string = 'main'
  message: string = ''
  loading:boolean = false;
  payload!:fetchFeed;
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
  
  constructor(
    private app: AppService,
    private dialog: MatDialog,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getFeed();
  }

  selectType(type: any){
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
    
    if(reload == 'success'){
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
    
    

    this.app.feedService.fetchFeed(this.payload)
    .subscribe({
      next: (res: any) => {
        this.message = ''
        this.loading = false
        this.feedList = res
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = typeof error == 'string' ? error : error.message
      }
    });
  }

  likePost(feed: any){
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

  sharePost(feed: any){
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
          this.app.snackbar.open(res['message'],  'Dismiss', {
            duration:Constant.TIMEOUT_DURATION
          })
          feed.shared_post = true
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
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.maxHeight = "60vh"
    dialogConfig.maxHeight = "95vh"
    dialogConfig.panelClass = 'comment-popup';
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

    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight - 1) {
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
        this.app.feedService.fetchFeed(this.payload)
        .subscribe({
          next: (res: any) => {
            this.message = ''
            this.newArray = res
            this.moreLoading = true
            if(this.newArray.length == 0){
              this.moreLoading = false
              this.isEmptyList = true
                this.app.snackbar.open('No more feed',  'Dismiss', {
                  duration:Constant.TIMEOUT_DURATION
                })

            }
            
            else{
              this.moreLoading = false
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
    }
  }

  userProfile(user: any){
    if(user?.user?.id == this.app.utilities.getUserId() && user?.user?.user_type == this.app.utilities.getUserType()){
      this.router.navigateByUrl('/app/profile')
    }

    else if(user?.school?.id == this.app.utilities.getUserId() && user?.school?.user_type == this.app.utilities.getUserType()){
      this.router.navigateByUrl('/app/profile')
    }

    else{
      
      let encUserId = btoa(user?.user ? user?.user?.id : user?.school?.id)
      let encUserType = btoa(user?.user ? user?.user?.user_type : user?.school?.user_type)


      // this.router.navigateByUrl('/app/user-profile?userid?' + 'userid=' + encUserId + 'usertype=' + encUserType)
      this.router.navigate(['/app/user-profile'], {queryParams: {userid: encUserId, usertype: encUserType}})
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

}
