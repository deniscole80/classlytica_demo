import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { time_ago } from 'src/app/resources/constants/date-format';
import { employmentNotification, shareNotification } from '../../models/notification.model';
import { acceptRequest, declineRequest } from 'src/app/base/management/models/management.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AcceptRequestComponent } from 'src/app/general-components/accept-request/accept-request.component';
import { DeclineRequestComponent } from 'src/app/general-components/decline-request/decline-request.component';

@Component({
  selector: 'app-notification-all',
  templateUrl: './notification-all.component.html',
  styleUrls: ['./notification-all.component.scss']
})
export class NotificationAllComponent implements OnInit {
  allNotifications: any[] = [
    // {
    //   type: 'share',
    //   username: 'mj',
    //   fullname: 'Muhammad Mijinyawa',
    //   updatedAt: '2023-02-14T17:50:42.254Z',
    //   post: '/assets/images/post1.png',
    //   profile_pic: '/assets/images/ramirez.png'
    // },

    // {
    //   type: 'like',
    //   username: 'koffi',
    //   fullname: 'Koffi Anna',
    //   updatedAt: '2023-02-14T17:50:42.254Z',
    //   post: '/assets/images/post2.png',
    //   profile_pic: '/assets/images/ramirez.png'
    // },

    // {
    //   type: 'share',
    //   username: 'john',
    //   fullname: 'John Moxley',
    //   updatedAt: '2023-02-14T17:50:42.254Z',
    //   post: null,
    //   profile_pic: '/assets/images/Akuba_Koffi.png'
    // },

    // {
    //   type: 'interest',
    //   username: 'kuchida',
    //   fullname: 'John Hachimurachi',
    //   updatedAt: '2023-02-14T12:50:42.254Z',
    //   post: null,
    //   profile_pic: '/assets/images/Akuba_Koffi.png'
    // },
  ]
  loading: boolean = false;
  error: string = '';
  notificationLoad!: shareNotification
  newStart: number = 0;
  newError: boolean = false;
  isEmptyList: boolean = false;
  moreLoading: boolean = false;
  message: string = '';
  newArray: any[]=[]
  imageUrl = Constant.POST_URL
  videoUrl = Constant.VIDEO_URL
  profileUrl = Constant.IMAGE_URL
  acceptLoading: boolean = false;
  sel!: number;
  declineLoading: boolean = false;
  

  constructor(private app: AppService, private router: Router, private dialog: MatDialog) { 
    this.app.getNotificationPosition().subscribe((el)=>{
      el.type == 'Others' ? this.onScroll(el) : null
    })
  }

  ngOnInit(): void {
    this.getRequest()
  }

  getTime(time: any){
    return time_ago(time)
  }

  getRequest(){
    this.loading = true
    this.error = ''

    let payload: employmentNotification = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      start: Constant.PAGE,
      length: Constant.MINI_SIZE
    }
    this.app.notificationService.employmentRequestNotification(payload)
    .subscribe({
      next: (res: any) => {
        res.forEach((ele: any) => {
          if(ele.employment_request){
            if(ele.responded && this.app.utilities.getUserType() == 1){
              this.allNotifications.push(ele)
            }else if(!ele.responded && this.app.utilities.getUserType() == 2){
              this.allNotifications.push(ele)
            }
          }
        });
        this.getNotifications()
      },

      error: (error) => {
        this.loading = false
        this.error = typeof error == 'string' ? error : error.message
      }
    });
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
    this.app.notificationService.shareNotification(this.notificationLoad)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        // this.allNotifications.splice(0,1)
        this.allNotifications.push(...res)
        // this.allNotifications.reverse()
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
        this.app.notificationService.shareNotification(this.notificationLoad)
        .subscribe({
          next: (res: any) => {
            this.message = ''
            this.newArray = res
            this.moreLoading = true
            if(this.newArray.length == 0){
              this.moreLoading = false
              this.isEmptyList = true
            }
            
            else{
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
      }

      else{
        this.app.snackbar.open('No more notifications',  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
      
    }
  }

  getProfile(user: any){
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

  acceptRequest(req: any, i: number){
    this.acceptLoading = true
    this.sel = i

    let dialogConfig = new MatDialogConfig
    dialogConfig.width = '30%'
    dialogConfig.height = '40vh'
    dialogConfig.panelClass = 'green-bkg'
    dialogConfig.data = {action: 'accept', name: req.school.school_name}

    this.dialog.open(AcceptRequestComponent, dialogConfig)
    .afterClosed().subscribe((res: any) =>{
      if(res == Constant.SUCCESS){
        let payload: acceptRequest = {
          school_id: req.employment_request.school_id,
          recipient_id: req.employment_request.recipient_id,
          request_id: req.request_id,
          status: 'accepted',
          staff_id: req.employment_request.staff_id,
          staff_type: req.employment_request.staff_type,
          notification_id: req.id
        }
        this.app.managementService.acceptEmploymentRequest(payload)
        .subscribe({
          next: (res: any) => {
            this.acceptLoading = false
            this.app.snackbar.open(res.message, 'Dismiss',{
              duration: Constant.TIMEOUT_DURATION
            })
            this.allNotifications = []
            this.getRequest()
          },
    
          error: (error) => {
            this.loading = false
            this.app.snackbar.open(typeof error == 'string' ? error : error.message, 'Dismiss', {
              duration: Constant.TIMEOUT_DURATION
            })
          }
        });
      }else{
        this.acceptLoading = false
      }
    })
  }

  declineRequest(req: any, i: number){
    this.declineLoading = true
    this.sel = i

    let dialogConfig = new MatDialogConfig
    dialogConfig.width = '30%'
    dialogConfig.height = '50vh'
    dialogConfig.data = {action: 'decline', name: req.school.school_name}

    this.dialog.open(DeclineRequestComponent, dialogConfig)
    .afterClosed().subscribe((res: any) =>{
      if(res){
        let payload: declineRequest = {
          school_id: req.employment_request.school_id,
          recipient_id: req.employment_request.recipient_id,
          request_id: req.request_id,
          status: 'declined',
          staff_id: req.employment_request.staff_id,
          staff_type: req.employment_request.staff_type,
          notification_id: req.id,
          reason: res
        }
        this.app.managementService.declineEmploymentRequest(payload)
        .subscribe({
          next: (res: any) => {
            this.declineLoading = false
            this.app.snackbar.open(res.message, 'Dismiss',{
              duration: Constant.TIMEOUT_DURATION
            })
            this.allNotifications = []
            this.getRequest()
          },
    
          error: (error) => {
            this.declineLoading = false
            this.app.snackbar.open(typeof error == 'string' ? error : error.message, 'Dismiss', {
              duration: Constant.TIMEOUT_DURATION
            })
          }
        });
      }else{
        this.declineLoading = false
      }
    })
  }
}
