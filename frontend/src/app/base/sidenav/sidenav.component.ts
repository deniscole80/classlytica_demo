import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { fetchFollowSuggestions, followUser } from 'src/app/onboarding/models/onboarding.model';
import { Constant } from 'src/app/resources/constants/constants';
import { profileComplete } from '../profile/models/profile.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  firstName: string = this.app.utilities.getUserFirstName();
  lastName: string = this.app.utilities.getUserLastName();
  profileImage: string = this.app.utilities.getUserProfileImage();
  userType: number = this.app.utilities.getUserType();
  allRoles: any = this.app.utilities.getAllCurrentRole()
  // profileImage: string = 'assets/images/avatar1.svg';
  imageUrl = Constant.IMAGE_URL
  isChild: boolean = false;

  sideNavList: any[] = [
    { name: 'Feed', icon: 'assets/images/feed.svg', iconActive: 'assets/images/feedactive.svg', route: '/app/feeds' },
    { name: 'Notification', icon: 'assets/images/notification.svg', iconActive: 'assets/images/notificationactive.svg', route: '/app/notifications' },
    { name: 'Profile', icon: 'assets/images/profile.svg', iconActive: 'assets/images/profileactive.svg', route: '/app/profile' },
    { name: 'School Management', icon: 'assets/images/Sm.svg', iconActive: 'assets/images/Sm.svg', child: [

      {name: 'Student', icon: 'assets/images/St.svg', iconActive: 'assets/images/St.svg', route: '/app/management/student'},
      {name: 'Staff', icon: 'assets/images/mdi_teacher.svg', iconActive: 'assets/images/mdi_teacher.svg', route: '/app/management/teacher'},
      {name: 'Classroom', icon: 'assets/images/Class.svg', iconActive: 'assets/images/Class.svg', route: '/app/management/classroom'},
      {name: 'Subjects', icon: 'assets/images/subject_inactive.svg', iconActive: 'assets/images/subject_inactive.svg', route: '/app/management/subjects'},
      {name: 'Report Card', icon: 'assets/images/reportcard.svg', iconActive: 'assets/images/reportactive.svg', route: '/app/management/reportcard'},
      {name: 'Parent', icon: 'assets/images/parent.svg', iconActive: 'assets/images/parent.svg', route: '/app/management/parent'},
      {name: 'Role Manager', icon: 'assets/images/Rm.svg', iconActive: 'assets/images/Rm.svg', route: '/app/management/role-manager'},
      // {name: 'CBT', icon: 'assets/images/cbt.svg', iconActive: 'assets/images/cbt.svg', route: '/app/management/cbt'},
      // {name: 'Annoucement', icon: 'assets/images/announce.svg', iconActive: 'assets/images/announce.svg', route: '/app/management/annoucement'},

    ]},
    { name: 'Logout', icon: 'assets/images/logout.svg', iconActive: 'assets/images/logout.svg',},
  ]

  innerHeight = window.innerHeight - (131);
  loading: boolean = false;
  suggestions: any[] = [];
  followArray: number[] = [];
  suggestionLoad!: followUser;
  message: string = '';
  error: boolean = false;
  percentage: number = 0
  showText: boolean = true;
  suggestionLoading: boolean = true;
  payload!: profileComplete; 
  usersLoad!: fetchFollowSuggestions; 
  closeLeft!: boolean;
  noSchool: boolean = false;

  constructor(
    private app: AppService,
    private router: Router 
  ) { 
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if(this.router.url.includes('/app/profile')){
            this.showText = false
            this.closeLeft = false
          }else if(this.router.url.includes('/app/management')){
            this.closeLeft = true
            this.showText = true
          }
          else{
            this.showText = true
            this.closeLeft = false
          }
        }
      }
    )

    this.app.getRefreshFollow().subscribe(()=>{
      this.getSuggestions()
    })

    this.app.getPicture().subscribe(()=>{
      this.profileImage = this.app.utilities.getUserProfileImage();
    })
  }

  ngOnInit(): void {
    this.getProgress()
    if(this.userType != 1){
      this.shouldDisplay(this.sideNavList.find((el: any) => el.name == 'School Management').child)
    }
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
        this.getSuggestions();
      },

      error: (error) => {
        this.loading = false
        this.suggestionLoading = false
        this.error = true
        this.message = typeof error == 'string' ? error : error.message
      }
    });

  }

  getSuggestions(){
    this.suggestionLoading = true
    this.error = false
    this.message = ''

    this.usersLoad = {
      user_type: this.app.utilities.getUserType(),
      user_id: this.app.utilities.getUserId()
    }

    this.app.onboardingService.fetchFollowSuggestions(this.usersLoad)
    .subscribe({
      next: (res: any) => {
        this.suggestionLoading = false
        this.error = false
        this.loading = false
        this.message = ''
        this.suggestions= res['suggestions']
      },

      error: (error) => {
        this.suggestionLoading = false
        this.loading = false
        this.error = true
        this.message = typeof error == 'string' ? error : error.message
      }
    });
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
        this.app.refreshFollow()

        if(value?.follow == 1){
          value.follow = 0
          this.app.snackbar.open(res['message'],  'Dismiss', {
            duration:Constant.TIMEOUT_DURATION
          })
        }

        else{
          value.follow = 1
          this.app.snackbar.open(res['message'],  'Dismiss', {
            duration:Constant.TIMEOUT_DURATION
          })
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
    if(user.id == this.app.utilities.getUserId() && user.user_type == this.app.utilities.getUserType()){
      this.router.navigateByUrl('/app/profile')
    }

    else{
      let encUserId = btoa(user?.id)
      let encUserType = btoa(user?.user_type)

      console.log(encUserId);
      console.log(encUserType);
      this.router.navigate(['/app/user-profile'], {queryParams: {userid: encUserId, usertype: encUserType}});
    }
  }

  exit(){
    this.app.exit()
  }

  routeUser(){
    this.router.navigateByUrl('/app/profile/complete-profile')
  }

  openChild(item: any){
    // this.router.navigateByUrl('/app/management')
    if(item.child){
      this.isChild = !this.isChild
    }
  }

  shouldDisplay(children: any){
    console.log(this.allRoles, 'children');
    
    children.map((child: any) => {
      child.display = true
      if(this.allRoles){
        this.allRoles.access.map((el: any) => {
          switch (child.name) {
            case 'Student':
              el.access_name == 'class_teacher' || el.access_name == 'student_management'? child.display = false: ''
            break;
            case 'Staff':
              el.access_name == 'staff_management' ? child.display = false : ''
            break;
            case 'Classroom':
              el.access_name == 'class_management' ? child.display = false : ''
            break;
            // case 'Subjects':
            //   el.access_name == 'subject_teacher' ? child.display = false : ''
            // break;
            case 'Subjects':
              el.access_name == 'subject_management' ? child.display = false : ''
            break;
            case 'Parent':
              el.access_name == 'parent_management' ? child.display = false : ''
            break;
            case 'Role Manager':
              el.access_name == 'role_management' ? child.display = false : ''
              break;
            case 'Report Card':
              el.access_name == 'report_management' ? child.display = false : ''
              break;
            default:
              child.display = false
              break;
          }
        })

        // console.log(child, 'child');
        
      }else{
        this.noSchool = true
      }
    })
  }
}
