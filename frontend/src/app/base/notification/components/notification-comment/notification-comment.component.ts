import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { time_ago } from 'src/app/resources/constants/date-format';
import { commentNotification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-comment',
  templateUrl: './notification-comment.component.html',
  styleUrls: ['./notification-comment.component.scss']
})
export class NotificationCommentComponent implements OnInit {

  allNotifications: any[] = [
    // {
    //   type: 'like',
    //   username: 'koffi',
    //   fullname: 'Koffi Anna',
    //   updatedAt: '2023-02-14T17:50:42.254Z',
    //   post: '/assets/images/post2.png',
    //   profile_pic: '/assets/images/ramirez.png'
    // },

    // {
    //   type: 'like',
    //   username: 'kuchida',
    //   fullname: 'John Hachimurachi',
    //   updatedAt: '2023-02-14T12:50:42.254Z',
    //   post: '/assets/images/post3.png',
    //   profile_pic: '/assets/images/Akuba_Koffi.png'
    // },
  ]
  loading: boolean = false;
  error: string = '';
  notificationLoad!: commentNotification
  imageUrl = Constant.POST_URL
  videoUrl = Constant.VIDEO_URL
  profileUrl = Constant.IMAGE_URL
  newStart: number = 0;
  newError: boolean = false;
  isEmptyList: boolean = false;
  moreLoading: boolean = false;
  message: string = '';
  newArray: any[]=[]

  constructor(private app: AppService, private router: Router) {
    this.app.getNotificationPosition().subscribe((el)=>{
      el.type == 'Comments' ? this.onScroll(el) : null
    })
   }

  ngOnInit(): void {
    this.getNotifications()
  }

  getTime(time: any){
    return time_ago(time)
  }

  getNotifications(){
    this.loading = true
    this.error = ''

    this.notificationLoad = {
      poster_id: this.app.utilities.getUserId(),
      poster_type: this.app.utilities.getUserType(),
      start: Constant.PAGE,
      length: Constant.MINI_SIZE
    }
    this.app.notificationService.commentNotification(this.notificationLoad)
    .subscribe({
      next: (res: any) => {
        console.log(res, 'response');
        this.loading = false
        this.allNotifications = res
      },

      error: (error) => {
        this.loading = false
        this.error = typeof error == 'string' ? error : error.message
      }
    });
  }

  onScroll(event: any) {   
    if (event.offset + event.scroll >= event.height) {
      this.newError = false
      this.newStart += 10

      if(!this.isEmptyList){
        this.moreLoading = true
        this.notificationLoad = {
          poster_id: this.app.utilities.getUserId(),
          poster_type: this.app.utilities.getUserType(),
          start: this.newStart,
          length: Constant.MINI_SIZE
        }
        this.app.notificationService.commentNotification(this.notificationLoad)
        .subscribe({
          next: (res: any) => {
            this.message = ''
            this.newArray = res
            this.moreLoading = true
            if(this.newArray.length == 0){
              this.moreLoading = false
              this.isEmptyList = true
            } else{
              this.isEmptyList = false
              for (let i = 0; i < this.newArray.length; i++) {
                this.allNotifications.push(res[i]) 
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
      } else{
        this.app.snackbar.open('No more notifications',  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }      
    }
  }

  getProfile(user: any){
    console.log(user);

    if(user?.user?.id == this.app.utilities.getUserId() && user?.user?.user_type == this.app.utilities.getUserType()){
      this.router.navigateByUrl('/app/profile')
    }

    else if(user?.school?.id == this.app.utilities.getUserId() && user?.school?.user_type == this.app.utilities.getUserType()){
      this.router.navigateByUrl('/app/profile')
    }

    else{
      console.log('am i here');
      
      let encUserId = btoa(user?.user ? user?.user?.id : user?.school?.id)
      let encUserType = btoa(user?.user ? user?.user?.user_type : user?.school?.user_type)

      console.log(encUserId);
      console.log(encUserType);

      // this.router.navigateByUrl('/app/user-profile?userid?' + 'userid=' + encUserId + 'usertype=' + encUserType)
      this.router.navigate(['/app/user-profile'], {queryParams: {userid: encUserId, usertype: encUserType}})
    }
  }

}
