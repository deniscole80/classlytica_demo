import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AppService } from 'src/app/app.service';
import { fetchMyKids, profileComplete } from '../../models/profile.model';
import { FollowersFollowingComponent } from '../followers-following/followers-following.component';
import { Router } from '@angular/router';
import { Constant } from 'src/app/resources/constants/constants';
import { ViewKidsComponent } from '../view-kids/view-kids.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  @Input() scroll: any;
  imgUrl = Constant.IMAGE_URL
  firstName: string = this.app.utilities.getUserFirstName();
  lastName: string = this.app.utilities.getUserLastName();
  userName: string = this.app.utilities.getUserName();
  bio: string = this.app.utilities.getUserBio(); 
  currentRole: any = this.app.utilities.getAllCurrentRole();
  currentEmployer: string = this.app.utilities.getUserCurrentEmployer();
  interests: string[] = this.app.utilities.getUserInterests();
  userType: number = this.app.utilities.getUserType();
  percentage: number = 0
  loading: boolean = false;
  error: boolean = false;
  message: any;
  payload!: profileComplete; 
  followers: number = 0
  following: number = 0
  followerList: any[] = []
  followingList: any[] = []
  tabValue: number = 0;
  kidLoading: boolean = true;
  kidList: any[] = []
  kidError: string = '';

  constructor(private app: AppService, private dialog: MatDialog, private router: Router) {
    this.app.getRefreshFollow().subscribe(()=>{
      this.getMyFollowers()
      this.getMyFollowing()
    })
   }

  ngOnInit(): void {
    this.getProgress()
    this.fetchMyKids()
  }
  
  getProgress(){ 
    this.loading = true

    this.payload = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType()
    }

    this.app.profileService.profileComplete(this.payload)
    .subscribe({
      next: (res: any) => {
        this.message = ''
        this.percentage = res['percent']

        this.getMyFollowing()
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = typeof error == 'string' ? error : error.error
      }
    });

  }

  viewList(type: string){
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "30%";
    dialogConfig.minHeight = "80vh"


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
        if(res = Constant.SUCCESS){
          console.log('did i work');
          
          this.getMyFollowing();
        }
      });
  }

  getMyFollowers(){
    this.payload = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType()
    }

    this.app.profileService.myFollowers(this.payload)
    .subscribe({
      next: (res: any) => {
        this.message = ''
        this.followerList = [...res['user_followers'], ...res['school_followers']]
        this.followers = res['school_followers'].length + res['user_followers'].length
        this.loading = false
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = typeof error == 'string' ? error : error.error
      }
    });
  }

  getMyFollowing(){
    this.payload = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType()
    }

    this.app.profileService.myFollowings(this.payload)
    .subscribe({
      next: (res: any) => {
        this.message = ''
        this.followingList = [...res['user_followings'], ...res['school_followings']]
        this.following =  res['user_followings'].length + res['school_followings'].length        
        this.getMyFollowers();
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = error
      }
    });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent){
    console.log(tabChangeEvent);
    this.tabValue = tabChangeEvent.index
}


  editCv(){
    this.router.navigateByUrl('/app/profile/cv')
  }

  completeProfile(){
    this.router.navigateByUrl('/app/profile/complete-profile')
  }

  completeSignUp(){
    this.router.navigateByUrl('/app/profile/complete-signup')
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

  fetchMyKids(){
    this.kidLoading = true

    let kidLoad: fetchMyKids = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType()
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
}
