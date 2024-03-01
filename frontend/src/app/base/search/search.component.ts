import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { searchUser } from './models/search.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  innerHeight = window.innerHeight - (198);
  searchText: string= '';

  searchTabs = [
    { name: 'Users', isactive: true},
    { name: 'Schools', isactive: false}
  ]
  activeTab: string = 'Users';
  users: any[] = []
  schools: any[] = []
  imgUrl = Constant.IMAGE_URL

  searchProfile: any
  searchLoading: boolean = false;
  searchError: string = '';
  

  constructor(private app: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  searchUser(){
    if(this.searchText == ''){
      this.users = []
      this.schools = []
    }

    let payload: searchUser = {
      user_id: this.app.utilities.getUserId(),
      user_type: this.app.utilities.getUserType(),
      keyword: this.searchText
    }

    this.searchLoading = true
    this.searchError = ''

    setTimeout(() => {
      this.app.searchService.searchUser(payload)
      .subscribe({
        next: res=>{
          this.searchLoading = false
          this.searchError = ''
          this.searchProfile = res
          this.users = this.searchProfile.users
          this.schools = this.searchProfile.schools
          if(this.searchText == ''){
            this.users = []
            this.schools = []
          }
        },
        error: err=>{
          this.searchLoading = false
          this.searchError = err.message
        }
      })
    }, 2000);

  }

  switchTab(tab: any){
    this.activeTab = tab.name

    if(tab.name == '')
    tab.isactive = true

    for (let i = 0; i < this.searchTabs.length; i++) {
      if(tab.name == this.searchTabs[i].name){
        this.searchTabs[i].isactive = true
      }

      else{
        this.searchTabs[i].isactive = false
      }
      
    }
  }

  userProfile(user: any){
    if(user?.id == this.app.utilities.getUserId() && user?.user_type == this.app.utilities.getUserType()){
      this.router.navigateByUrl('/app/profile')
    }

    else{      
      let encUserId = btoa(user?.id)
      let encUserType = btoa(user?.user_type)

      console.log(encUserId);
      console.log(encUserType);

      // this.router.navigateByUrl('/app/user-profile?userid?' + 'userid=' + encUserId + 'usertype=' + encUserType)
      this.router.navigate(['/app/user-profile'], {queryParams: {userid: encUserId, usertype: encUserType}})
    }
  }
}
