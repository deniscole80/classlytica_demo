import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { BaseUrlService } from 'src/app/services/base-url.service';
import { fetchFollowSuggestions, finishOnboarding, followUser } from '../../models/onboarding.model';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {
  innerHeight = window.innerHeight - (351);
  @Output() stepNumber = new EventEmitter<number>();
  imageUrl = Constant.IMAGE_URL
  profilePic: string = this.app.utilities.getUserProfileImage()

  profileArray: any[]= []
  loading: boolean = false;
  suggestions: any[] = [];
  followArray: number[] = [];
  suggestionLoad!: followUser;
  message: string = '';
  error: boolean = false;
  firstname: string = this.app.utilities.getUserFirstName();
  finishLoading!: boolean;
  payload!: finishOnboarding
  finishError: boolean = false

  userLoad!:fetchFollowSuggestions

  constructor(private app: AppService, private base:BaseUrlService) { }

  ngOnInit(): void {
    this.getSuggestions()
  }

  followToggle(value: any){
    this.suggestionLoad = {
      user_id: value.id,
      follower_id: this.app.utilities.getUserId(),
      user_type:  value.user_type,
      follower_type: this.app.utilities.getUserType()
    }

    this.app.onboardingService.followUser(this.suggestionLoad)
    .subscribe({
      next: (res: any) => {
        if(value?.follow == 1){
          value.follow = 0
          let following = this.followArray.indexOf(value?.id)
          this.followArray.splice(following, 1)
        }

        else{
          value.follow = 1
          this.followArray.push(value?.id)
        }
      },

      error: (error) => {
        this.app.snackbar.open(error,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
    
  }

  getSuggestions(){
    this.loading = true
    this.error = false
    this.message = ''

    this.userLoad = {
      user_type: this.app.utilities.getUserType(),
      user_id: this.app.utilities.getUserId()
    }

    this.app.onboardingService.fetchFollowSuggestions(this.userLoad)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.error = false
        this.message = ''
        this.suggestions= res['suggestions']
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = error
      }
    });
  }

  back(){
    this.stepNumber.emit(2)
  }

  next(){
    this.finishLoading = true
    this.finishError = false

    this.payload = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType()
    }

    this.app.onboardingService.finishOnboarding(this.payload)
    .subscribe({
      next: (res: any) => {
        this.finishLoading = false
        this.finishError = false
        this.stepNumber.emit(4)
        this.app.snackbar.open(res['message'],  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      },

      error: (error) => {
        this.finishLoading = false
        this.finishError = true
        this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
    });
  }
  

}
