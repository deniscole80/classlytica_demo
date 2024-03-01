import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { CommentService } from './base/feed/services/comment.service';
import { FeedService } from './base/feed/services/feed.service';
import { ManagementService } from './base/management/services/management.service';
import { NotificationService } from './base/notification/services/notification.service';
import { ProfileService } from './base/profile/services/profile.service';
import { SearchService } from './base/search/services/search.service';
import { OnboardingService } from './onboarding/services/onboarding.service';
import { Constant } from './resources/constants/constants';
import { UtilitiesService } from './resources/utilities/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private isLoggedin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private scrollPosition: BehaviorSubject<any> = new BehaviorSubject<any>('')
  private userFeedPosition: BehaviorSubject<any> = new BehaviorSubject<any>('')
  private mgtPosition: BehaviorSubject<any> = new BehaviorSubject<any>('')
  private setNotificationScrollPosition: BehaviorSubject<any> = new BehaviorSubject<any>('')
  private profilePic: BehaviorSubject<any> = new BehaviorSubject<any>(this.utilities.getUserProfileImage());
  private headerPic: BehaviorSubject<any> = new BehaviorSubject<any>(this.utilities.getUserHeaderImage());
  private followRefresh: BehaviorSubject<any> = new BehaviorSubject<any>('')

  constructor(
    // Api services
    public authService: AuthService,
    public onboardingService: OnboardingService,
    public feedService: FeedService,
    public profileService: ProfileService,
    public commentService: CommentService,
    public notificationService: NotificationService,
    public managementService: ManagementService,
    public searchService: SearchService,

    // Other services
    public utilities: UtilitiesService,
    private router: Router,
    public snackbar: MatSnackBar,
  ) { 

  }

  getOnboardingStatus(){
    if(this.utilities.getFromStore(Constant.USER)){
      return this.utilities.onboardedStatus()
    }
  }

  setScrollPosition(scrollData: any){
    this.scrollPosition.next(scrollData)
  }

  setuserFeedPosition(userFeedData: any){
    this.userFeedPosition.next(userFeedData)
  }
  getuserFeedPosition(): Observable<any>{
    return this.userFeedPosition.asObservable()
  }

  refreshFollow(){
    this.followRefresh.next('')
  }

  getRefreshFollow(): Observable<any>{
    return this.followRefresh.asObservable()
  }

  setNotificationPosition(scrollNotification: any){
    this.setNotificationScrollPosition.next(scrollNotification)
  }

  getScrollPosition(): Observable<any>{
    return this.scrollPosition.asObservable()
  }

  getNotificationPosition(): Observable<any>{
    return this.setNotificationScrollPosition.asObservable()
  }

  setMgtPosition(scrollData: any){
    this.mgtPosition.next(scrollData)
  }

  getMgtPosition(): Observable<any>{
    return this.mgtPosition.asObservable()
  }

  checkLoginStatus() {
    let login = this.utilities.getFromStore(Constant.USER)

    login ? this.isLoggedin.next(true) : this.isLoggedin.next(false);

  }

  setProfilePic(val: any): void {
    this.utilities.setUserProfileImage(val)
    this.profilePic.next(val)
  }

  getPicture(): Observable<string>{
    return this.profilePic.asObservable();
  }

  setHeaderPic(val: any): void {
    this.utilities.setUserHeaderImage(val)
    this.headerPic.next(val)    
  }

  getHeaderPic(): Observable<string>{
    return this.headerPic.asObservable();
  }

  // This is where u subscribe to check loginStatus
  loginStatus(): Observable<boolean> {
    return this.isLoggedin.asObservable();
  }

  setLoginStatus(val: boolean): void {
    this.isLoggedin.next(val);
  }


  exit(): void {
    localStorage.clear();
    this.isLoggedin.next(false);
    this.router.navigateByUrl('/');
  }
}
