import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { setUserInterests } from 'src/app/onboarding/models/onboarding.model';
import { Constant } from 'src/app/resources/constants/constants';
import { completeUserProfile } from '../../models/profile.model';

@Component({
  selector: 'app-complete-interests',
  templateUrl: './complete-interests.component.html',
  styleUrls: ['./complete-interests.component.scss']
})
export class CompleteInterestsComponent implements OnInit {
  firstName: string = this.app.utilities.getUserFirstName();
  lastName: string = this.app.utilities.getUserLastName();
  userName: string = this.app.utilities.getUserName();
  message: string = '';
  error: boolean = false;
  interests: any[] = []
  loading: boolean= false;
  activeInterest: string[]= []
  text: string = this.app.utilities.getUserBio();
  submitLoading: boolean = false;
  payload!: setUserInterests;
  bioLoad!: completeUserProfile;
  submitError: string = ''

  constructor(private app: AppService, private router: Router) { }

  ngOnInit(): void {
    this.getInterests()
    let interest = this.app.utilities.getUserInterests()
    
    if(interest){
      this.activeInterest = interest
      console.log(this.activeInterest, 'active');
    }
  }

  setPrev(){
    this.interests.forEach((el: any) => {
      if(this.activeInterest.includes(el.interest)){
        el.active = 1
      }
    })
  }

  getInterests(){
    this.loading = true
    this.error = false
    this.message = ''

    this.app.onboardingService.fetchAllInterests()
    .subscribe({
      next: (res: any) => {
        this.interests = res

        
        this.loading = false
        this.error = false
        this.message = ''
        if(this.activeInterest.length > 0){
          this.setPrev()
        }
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = typeof error == 'string' ? error : error.error
      }
    });
  }

  setActive(item: any, i: number){
    if(item?.active == 1){
      item.active = 0
      let interest = this.activeInterest.indexOf(item?.interest)
      this.activeInterest.splice(interest, 1)
    }

    else{
      item.active = 1
      this.activeInterest.push(item?.interest)
    } 
    
  }

  completeInterests(){
   this.submitLoading = true

   this.submitError = ''

   this.payload = {
    user_id: this.app.utilities.getUserId(),
    interests: this.activeInterest,
    user_type: this.app.utilities.getUserType()
   }

   this.app.onboardingService.setUserInterests(this.payload)
    .subscribe({
      next: (res: any) => {
        this.submitError = ''
        this.app.utilities.setUserInterests(this.activeInterest)
        this.setBio();
      },

      error: (error) => {
        this.submitLoading = false
        this.submitError = typeof error == 'string' ? error : error.error
      }
    });   
  }

  setBio(){
    this.bioLoad = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      bio: this.text
     }
  
     this.app.profileService.completeUserProfile(this.bioLoad)
      .subscribe({
        next: (res: any) => {
          this.submitLoading = false
          this.app.snackbar.open(res['message'],  'Dismiss', {
            duration:Constant.TIMEOUT_DURATION
          })
          this.app.utilities.setUserBio(this.text)
          this.router.navigateByUrl('/app/profile')
        },
  
        error: (error) => {
          this.submitLoading = false
          this.submitError = typeof error == 'string' ? error : error.error
        }
      }); 
  }

}
