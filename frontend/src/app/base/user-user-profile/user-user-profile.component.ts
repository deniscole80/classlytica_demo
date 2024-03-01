import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { viewProfile } from '../profile/models/profile.model';

@Component({
  selector: 'app-user-user-profile',
  templateUrl: './user-user-profile.component.html',
  styleUrls: ['./user-user-profile.component.scss']
})
export class UserUserProfileComponent implements OnInit {  
  loading: boolean = false;
  error: boolean = false;
  payload!: viewProfile
  profileData: any;
  userid: any;
  usertype: any;
  backgroundImage: string = ''
  profileImage: string = ''
  imageUrl = Constant.IMAGE_URL

  constructor(private app: AppService, 
    private route: ActivatedRoute
    ) {
      this.route.queryParams.subscribe((params)=>{
        this.userid = parseInt(atob(params['userid']))
        this.usertype = parseInt(atob(params['usertype']))
        this.getData()
      }) }

  ngOnInit(): void {
    console.log(this.userid);
    console.log(this.usertype);
  }

  onScroll(event: any){
    
    let scrollData = {
      offset: event.target.offsetHeight,
      scroll: event.target.scrollTop,
      height: event.target.scrollHeight
    }
    console.log(scrollData);

    this.app.setuserFeedPosition(scrollData)
  }

  getData(){
    this.loading = true
    this.error = false

    this.payload = {
      user_id: this.userid,
      user_type: this.usertype,
      visitor_id: this.app.utilities.getUserId(),
      visitor_type: this.app.utilities.getUserType(),
      start: Constant.PAGE,
      length: Constant.MINI_SIZE
    }

    this.app.profileService.viewProfile(this.payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.profileData = res
        this.profileImage = this.profileData?.user ? this.profileData?.user?.profile_img : this.profileData?.user?.profile_img
        this.backgroundImage = this.profileData?.user ? this.profileData?.user?.cover_img : this.profileData?.user?.cover_img
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });

  }



}
