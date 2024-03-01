import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { followUser } from 'src/app/onboarding/models/onboarding.model';
import { Constant } from 'src/app/resources/constants/constants';

@Component({
  selector: 'app-followers-following',
  templateUrl: './followers-following.component.html',
  styleUrls: ['./followers-following.component.scss']
})
export class FollowersFollowingComponent implements OnInit {
  type = this.listData?.type
  dataList: any[] = this.listData?.list
  suggestionLoad!: followUser
  imageUrl = Constant.IMAGE_URL
  userId: any = this.app.utilities.getUserId()
  userType: any = this.app.utilities.getUserType()
  constructor(
    public dialogRef: MatDialogRef<FollowersFollowingComponent>,
    @Inject(MAT_DIALOG_DATA) public listData:any,
    private app: AppService, private router: Router
    ) { }

  ngOnInit(): void {
    console.log(this.dataList, 'hhhhhhhh');
    
  }

  closeModal(){
    this.dialogRef.close(Constant.SUCCESS);
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
          if(this.type == 'Followers'){
            value.following = true
          }

          else{
            value.id = 1

            console.log(value.id, 'hhhhhh');
            
          }
        }

        else{
          if(this.type == 'Followers'){
            value.following = false
          }

          else{
            value.id = 0

            console.log(value.id, 'hhhhhh');
            
          }
        }

        
      },

      error: (error) => {
        this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
    
  }


  userProfile(user: any){
    console.log(user, 'User');
    if(user?.user?.id == this.app.utilities.getUserId() && user?.user?.user_type == this.app.utilities.getUserType()){
      this.router.navigateByUrl('/app/profile')
      this.dialogRef.close()
    }

    else if(user?.school?.id == this.app.utilities.getUserId() && user?.school?.user_type == this.app.utilities.getUserType()){
      this.router.navigateByUrl('/app/profile')
      this.dialogRef.close()
    }

    else{
      console.log('am i here');
      
      let encUserId = btoa(user?.user ? user?.user?.id : user?.school?.id)
      let encUserType = btoa(user?.user ? user?.user?.user_type : user?.school?.user_type)

      console.log(encUserId);
      console.log(encUserType);

      // this.router.navigateByUrl('/app/user-profile?userid?' + 'userid=' + encUserId + 'usertype=' + encUserType)
      this.router.navigate(['/app/user-profile'], {queryParams: {userid: encUserId, usertype: encUserType}})
      this.dialogRef.close()
    }
  }

  checkType(user: any){
    console.log(user, 'lets see');
    
      if(user.user?.id == this.userId && user.user?.user_type == this.userType ){
        return false
      }
      else if(user.school?.id == this.userId && user.school?.user_type == this.userType ){
        return false
      }

      else return true
  }

}
