import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { setUserInterests } from '../../models/onboarding.model';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {
  interests: any[] = []
  loading: boolean= false;
  activeInterest: string[]= []
  payload!: setUserInterests
  setLoading: boolean = false;
  @Output() stepNumber = new EventEmitter<number>();
  message: string = '';
  error: boolean = false;


  constructor(private app: AppService) { }

  ngOnInit(): void {
    this.getInterests()

    let interest = this.app.utilities.getUserInterests()
    
    if(interest){
      this.activeInterest = interest
      console.log(this.activeInterest, 'active');
    }
    
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
        this.loading = false
        this.error = false
        this.message = ''
        this.interests= res

        if(this.activeInterest.length > 0){
          this.setPrev()
        }
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = error
      }
    });
  }

  next(){
    this.setLoading = true


    if(this.interests.length <= 0){
      this.stepNumber.emit(3)
    }

    else{
      this.payload = {
        user_id: this.app.utilities.getUserId(),
        interests: this.activeInterest,
        user_type: this.app.utilities.getUserType()
      }
  
      this.app.onboardingService.setUserInterests(this.payload)
      .subscribe({
        next: (res: any) => {
          this.setLoading = false
          this.app.utilities.setUserInterests(this.activeInterest)
          this.stepNumber.emit(3)
        },
  
        error: (error) => {
          this.setLoading = false
          this.app.snackbar.open(error,  'Dismiss', {
            duration:Constant.TIMEOUT_DURATION
          })
        }
      });
    }

    
  }

  back(){
    this.stepNumber.emit(1)
  }

}
