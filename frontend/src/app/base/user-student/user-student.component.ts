import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Constant } from 'src/app/resources/constants/constants';
import { fetchClassStudents } from '../management/models/management.model';

@Component({
  selector: 'app-user-student',
  templateUrl: './user-student.component.html',
  styleUrls: ['./user-student.component.scss']
})
export class UserStudentComponent implements OnInit {
  loading: boolean = false;
  error: boolean = false;
  profileData: any;
  userid: any;
  usertype: any;
  backgroundImage: string = ''
  profileImage: string = ''
  imageUrl = Constant.IMAGE_URL
    data: any;

  constructor(private route: ActivatedRoute, private app: AppService) {
    this.route.queryParams.subscribe(el=>{
      this.data = el
      console.log(this.data, 'data');
      
      if(this.data.type == 'student'){
        this.getStudent()
      }
    })
   }

  ngOnInit(): void {

  }

  getStudent(){
    this.loading = true

    let payload: fetchClassStudents = {
      school_id: parseInt(this.data.schoolId),
      class_id: parseInt(this.data.classId)
    }

    this.app.managementService.fetchClassStudents(payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.profileData = res.find((el: any)=> el.id == parseInt(this.data.id))
        console.log(this.profileData, 'check');
        this.profileImage = this.profileData.img
        // this.profileImage = this.profileData?.user ? this.profileData?.user?.profile_img : this.profileData?.user?.profile_img
        // this.backgroundImage = this.profileData?.user ? this.profileData?.user?.cover_img : this.profileData?.user?.cover_img
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
