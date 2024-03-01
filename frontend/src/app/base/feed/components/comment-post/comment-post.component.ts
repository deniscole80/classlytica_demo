import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { time_ago } from 'src/app/resources/constants/date-format';
import { createComments, fetchComments } from '../../models/comment.service';
import { likePost, sharePost } from '../../models/feed.model';
import { CommentUploadComponent } from '../comment-upload/comment-upload.component';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.scss']
})
export class CommentPostComponent implements OnInit {
  likeLoad!: likePost;
  shareLoad!: sharePost;
  text: string = '';
  commentLoad!: fetchComments;
  textLoad!: createComments;
  imageUrl: string = Constant.IMAGE_URL
  postUrl: string = Constant.POST_URL
  videoUrl: string = Constant.VIDEO_URL
  defaultPic: string = 'assets/images/nomad.svg'
  innerHeight = window.innerHeight - (103);

  @ViewChild("myInput") private _inputElement!: ElementRef;
  @ViewChild("#otherInput") private otherElem!: ElementRef;

  commentList: any[] = []
  loading: boolean = false;
  error: string = '';
  textLoading: boolean = false;
  show: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedRow:any,
    private app: AppService,
    public dialogRef: MatDialogRef<CommentUploadComponent>,
    private router: Router,
    ) {}

  ngOnInit(): void {
    
    this.getComments()
    
  }

  ngAfterViewInit(): void {
    // this._inputElement.nativeElement.focus();
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
        }

        else{
          feed.likes = feed?.likes - 1
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


  commentPost(){
    this.textLoading = true
    this.error = ''
    this.textLoad = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      post_id: this.selectedRow?.id,
      poster_id: this.selectedRow.user ? this.selectedRow.user?.id : this.selectedRow.school?.id,
      poster_type: this.selectedRow.user ? this.selectedRow.user?.user_type : this.selectedRow.school?.user_type,
      text: this.text
    }

    this.app.commentService.createComments(this.textLoad)
    .subscribe({
      next: (res: any) => {     
        this.textLoading = false 
        this.text = ''
        this.show = false
        this.selectedRow.comments++
        
        this.getComments()
        this.error = ''
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      },

      error: (error) => {
        this.textLoading = false 
        this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
  }

  getTime(time: any){
    return time_ago(time)
  }

  closeModal(){
    this.dialogRef.close();
  }

  getComments(){
    this.loading = true
    this.error = ''
    this.commentLoad = {
      start: Constant.PAGE,
      length: Constant.MINI_SIZE,
      poster_id: this.selectedRow.user ? this.selectedRow.user?.id : this.selectedRow.school?.id,
      poster_type: this.selectedRow.user ? this.selectedRow.user?.user_type : this.selectedRow.school?.user_type,
      post_id: this.selectedRow?.id
    }

    this.app.commentService.fetchComments(this.commentLoad)
    .subscribe({
      next: (res: any) => {     
        this.loading = false
        this.error = ''
        this.commentList = res
      },

      error: (error) => {
        this.loading = false
        this.error = typeof error == 'string' ? error : error.message
      }
    });
  }

  userProfile(userId: any, userType: any){
    this.dialogRef.close();
    if(userId == this.app.utilities.getUserId() && userType == this.app.utilities.getUserType()){
      this.router.navigateByUrl('/app/profile')
    }

    else{
      
      let encUserId = btoa(userId)
      let encUserType = btoa(userType)


      // this.router.navigateByUrl('/app/user-profile?userid?' + 'userid=' + encUserId + 'usertype=' + encUserType)
      this.router.navigate(['/app/user-profile'], {queryParams: {userid: encUserId, usertype: encUserType}})
    }
  }

  viewProfile(user: any){
    this.dialogRef.close();
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

}
