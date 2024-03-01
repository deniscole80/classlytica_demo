import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AppService } from 'src/app/app.service';
import { FollowersFollowingComponent } from 'src/app/base/profile/components/followers-following/followers-following.component';
import { ViewKidsComponent } from 'src/app/base/profile/components/view-kids/view-kids.component';
import { fetchMyKids, profileComplete } from 'src/app/base/profile/models/profile.model';
import { ViewCvComponent } from 'src/app/general-components/view-cv/view-cv.component';
import { followUser } from 'src/app/onboarding/models/onboarding.model';
import { Constant } from 'src/app/resources/constants/constants';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @Input() userData: any;
  suggestionLoad!: followUser
  loading: boolean = false;
  error: boolean = false;
  message: any;
  payload!: profileComplete; 
  followers: number = 0
  following: number = 0
  followerList: any[] = []
  followingList: any[] = []
  tabValue: number = 0;
  imageUrl = Constant.IMAGE_URL
  kidLoading!: boolean;
  kidError: string = '';
  kidList: any = [];
  userType = this.app.utilities.getUserType()

  constructor(private app: AppService, private dialog: MatDialog,) { 

  }

  ngOnInit(): void {
    console.log(this.userType, 'the type');
    this.app.getRefreshFollow().subscribe(()=>{
      this.getMyFollowers()
      this.getMyFollowing()
    })
    // this.getMyFollowing()
    if(this.userData?.user?.status == 'parent'){
      this.fetchMyKids()
    }
  }

  followToggle(value: any){
    this.suggestionLoad = {
      user_id:  value.user ? value.user?.id : value.school?.id,
      follower_id: this.app.utilities.getUserId(),
      user_type: value.user ? value.user?.user_type : value.school?.user_type,
      follower_type: this.app.utilities.getUserType()
    }

    this.app.onboardingService.followUser(this.suggestionLoad)
    .subscribe({
      next: (res: any) => {
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
        this.app.refreshFollow()

        if(res['message'] == 'Followed successfully'){
          value.following = true
          // this.getMyFollowing()
        }

        else{
          value.following = false
          // this.getMyFollowing()

        }

        
      },

      error: (error) => {
        this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
    
  }

  viewCv(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = "50%";
    dialogConfig.minHeight = "95vh";
    dialogConfig.panelClass = 'custom-popup';
    dialogConfig.data = {userid: this.userData?.user.id, usertype: this.userData?.user.user_type}

    this.dialog
      .open(ViewCvComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
      });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent){
    console.log(tabChangeEvent);
    this.tabValue = tabChangeEvent.index
}

  viewList(type: string){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "30%";
    dialogConfig.minHeight = "80vh"
    dialogConfig.data = 'others'

    if(type == 'followers'){
      dialogConfig.data = {list: this.followerList, type: 'Followers'}
    }

    else{
      dialogConfig.data = {list: this.followingList, type: 'Following'}
    }
    this.dialog
      .open(FollowersFollowingComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
        this.getMyFollowers();
        this.getMyFollowing();
      });
  }

  getMyFollowers(){
    
    this.followerList = []
    this.followers = 0
    this.payload = {
      user_id: this.userData?.user ? this.userData?.user?.id : this.userData?.school?.id,
      user_type: this.userData?.user ? this.userData?.user?.user_type : this.userData?.school?.user_type,
    }
    console.log(this.payload, 'ffjjfjfjfjfjfjf');

    this.app.profileService.myFollowers(this.payload)
    .subscribe({
      next: (res: any) => {
        this.message = ''
        this.followerList = [...res['user_followers'], ...res['school_followers']]
        this.followers = res['school_followers'].length + res['user_followers'].length                
        console.log(this.followers, 'follow');
        
        this.loading = false
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = error
      }
    });
  }

  getMyFollowing(){
    console.log(this.userData, 'ffjjfjfjfjfjfjf');

    this.followingList = []
    this.following = 0

    this.payload = {
      user_id: this.userData?.user ? this.userData?.user?.id : this.userData?.school?.id,
      user_type: this.userData?.user ? this.userData?.user?.user_type : this.userData?.school?.user_type,
    }

    this.app.profileService.myFollowings(this.payload)
    .subscribe({
      next: (res: any) => {
        this.message = ''
        this.followingList = [...res['user_followings'], ...res['school_followings']]
        this.following =  res['user_followings'].length + res['school_followings'].length        
        // this.getMyFollowers();
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = error
      }
    });
  }

  fetchMyKids(){
    this.kidLoading = true

    let kidLoad: fetchMyKids = {
      user_id: this.userData.user.id,
      user_type: this.userData.user.user_type
    }

    this.app.profileService.fetchMyKids(kidLoad)
    .subscribe({
      next: (res: any) => {
        this.kidLoading = false
        this.kidError = ''
        this.kidList = res
      },

      error: (error) => {
        this.kidLoading = false
        this.kidError = typeof error == 'string' ? error : error.error
      }
    });
  }

  viewKids(){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = "30%";
    dialogConfig.minHeight = "80vh"
    dialogConfig.data = this.kidList
    dialogConfig.panelClass = 'kid-popup'
    this.dialog
      .open(ViewKidsComponent, dialogConfig)
      .afterClosed()
      .subscribe((res) => {
      });
  }

}
