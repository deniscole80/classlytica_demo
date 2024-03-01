import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constant, Util } from 'src/app/resources/constants/constants';
import { employmentRequest, employmentRequestaction, fetchRequest, searchUser } from '../../../models/management.model';
import { AppService } from 'src/app/app.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TakeActionComponent } from 'src/app/general-components/take-action/take-action.component';

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.scss']
})
export class RegisterTeacherComponent implements OnInit {
  countries = Util.countries
  imageUrl = Constant.IMAGE_URL
  searchList: any = [
    // {name: 'Hannah Efe', at: '@efe', flag: 'NG'},
  ]

  responseList: any = [
    // {name: 'Hannah Efe', at: '@efe', status: 'Awaiting Teacher Response', flag: 'NG'},
    // {name: 'Gary David', at: '@gary1', status: 'Awaiting Teacher Response', flag: 'US'},
  ]
  searchLoading: boolean = false;
  searchError: any;
  searchText: string= '';
  requestLoading: boolean = false;
  responseError: any;
  responseLoading: boolean = false;
  status: string = 'pending'
  actionLoading: boolean = false;
  user!: number;

  constructor(private fb: FormBuilder, private app: AppService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRequestList()
  }

  search(){
    let payload: searchUser = {
      keyword: this.searchText,
      user_type: 2
    }

    this.searchLoading = true
    setTimeout(() => {
      this.app.managementService.searchUser(payload)
      .subscribe({
        next: res=>{
          this.searchLoading = false
          this.searchList = res
        },
        error: err=>{
          this.searchLoading = false
          this.searchError = err.message
        }
      })
    }, 2000);
  }

  sendRequest(staff: any, index: number){
    let payload: employmentRequest = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      staff_id: this.app.utilities.getUserId(),
      staff_type: 1,
      recipient_id: staff.id,
      status: 'pending'
    }
    this.user = index
    this.requestLoading = true
    this.app.managementService.employmentRequest(payload)
    .subscribe({
      next: res=>{
        this.requestLoading = false
        this.app.snackbar.open(res['message'], 'Dismiss', {
          duration: Constant.TIMEOUT_DURATION
        })
        staff.isSent = true
        this.getRequestList()
      },
      error: err=>{
        this.requestLoading = false
        this.responseError = err.message
      }
    })
  }

  getRequestList(){
    let payload: fetchRequest = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      length: Constant.MINI_SIZE,
      start: Constant.PAGE,
      status: this.status
    }
    
    this.responseLoading = true
    this.app.managementService.fetchEmploymentRequest(payload)
    .subscribe({
      next: res=>{
        this.responseLoading = false
        this.responseList = res
      },
      error: err=>{
        this.responseLoading = false
        this.responseError = err.message
      }
    })
  }

  requestAction(action: string, teach: any){
    let dialogConfig = new MatDialogConfig
    dialogConfig.width = '30%'
    dialogConfig.height = '40vh'
    dialogConfig.panelClass = 'green-bkg'
    dialogConfig.data = {action: action, name: teach.user.first_name + ' ' + teach.user.last_name}

    let payload: employmentRequestaction = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      recipient_id: teach.recipient_id,
      request_id: teach.id, 
      staff_id: teach.staff_id,
      staff_type: teach.staff_type,
      status: action
    }

    this.dialog.open(TakeActionComponent, dialogConfig)
    .afterClosed().subscribe(res=>{
      if(res == Constant.SUCCESS){
        this.actionLoading = true

        this.app.managementService.EmploymentRequestAction(payload)
        .subscribe({
          next: res=>{
            this.actionLoading = false
            this.app.snackbar.open(res['message'], 'Dismiss', {
              duration: Constant.TIMEOUT_DURATION
            })
            // this.responseList = res
            this.getRequestList()
          },
          error: err=>{
            this.actionLoading = false
            this.responseError = err.message
          }
        })
      }
    })
  }

  declineAction(action: string, teach: any){
    let dialogConfig = new MatDialogConfig
    dialogConfig.width = '30%'
    dialogConfig.height = '40vh'
    dialogConfig.panelClass = 'green-bkg'
    dialogConfig.data = {action: action, name: teach.user.first_name + ' ' + teach.user.last_name, message: teach.message}

    let payload: employmentRequestaction = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      recipient_id: teach.recipient_id,
      request_id: teach.id, 
      staff_id: teach.staff_id,
      staff_type: teach.staff_type,
      status: action
    }

    this.dialog.open(TakeActionComponent, dialogConfig)
    .afterClosed().subscribe(res=>{
      if(res == Constant.SUCCESS){
        this.actionLoading = true

        this.app.managementService.EmploymentRequestAction(payload)
        .subscribe({
          next: res=>{
            this.actionLoading = false
            this.app.snackbar.open(res['message'], 'Dismiss', {
              duration: Constant.TIMEOUT_DURATION
            })
            // this.responseList = res
            this.getRequestList()
          },
          error: err=>{
            this.actionLoading = false
            this.responseError = err.message
          }
        })
      }
    })
  }
}
