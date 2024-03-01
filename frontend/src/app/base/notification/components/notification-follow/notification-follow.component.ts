import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { followUser } from 'src/app/onboarding/models/onboarding.model';
import { Constant } from 'src/app/resources/constants/constants';
import { time_ago } from 'src/app/resources/constants/date-format';
import { followNotification } from '../../models/notification.model';

@Component({
  selector: 'app-notification-follow',
  templateUrl: './notification-follow.component.html',
  styleUrls: ['./notification-follow.component.scss']
})
export class NotificationFollowComponent implements OnInit {
  followList: any[] = []

  loading: boolean = false;
  error: string = '';
  notificationLoad!: followNotification
  suggestionLoad!: followUser;
  imageUrl = Constant.IMAGE_URL
  newStart: number = 0;
  newError: boolean = false;
  isEmptyList: boolean = false;
  moreLoading: boolean = false;
  message: string = '';
  newArray: any[]=[]

  constructor(private app: AppService, private router: Router) {
    this.app.getNotificationPosition().subscribe((el)=>{
      el.type == 'Follow' ? this.onScroll(el) : null
    })
   }

  ngOnInit(): void {
    this.getNotifications()
  }

  getTime(time: any){
    return time_ago(time)
  }

  followToggle(value: any){
    this.suggestionLoad = {
      user_id: value.user ? value.user.id : value.school.id,
      follower_id: this.app.utilities.getUserId(),
      user_type:  value.user ? value.user.user_type : value.school.user_type,
      follower_type: this.app.utilities.getUserId()
    }

    this.app.onboardingService.followUser(this.suggestionLoad)
    .subscribe({
      next: (res: any) => {
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })

        if(value.following){
          value.following = false
        }
    
        else{
          value.following = true
          console.log(value.followStatus);
        }
      },

      error: (error) => {
        this.app.snackbar.open(error,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
  }

  getNotifications(){
    this.loading = true
    this.error = ''

    this.notificationLoad = {
      following_id: this.app.utilities.getUserId(),
      following_type: this.app.utilities.getUserType(),
      start: Constant.PAGE,
      length: Constant.MINI_SIZE
  }
    this.app.notificationService.followNotification(this.notificationLoad)
    .subscribe({
      next: (res: any) => {
        console.log(res, 'response');
        this.loading = false
        this.followList = res
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
          following_id: this.app.utilities.getUserId(),
          following_type: this.app.utilities.getUserType(),
          start: this.newStart,
          length: Constant.MINI_SIZE
        }
        this.app.notificationService.followNotification(this.notificationLoad)
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
                this.followList.push(res[i]) 
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
