import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Constant, Util } from 'src/app/resources/constants/constants';
import { fetchAllStaff } from '../../../models/management.model';

@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent implements OnInit {
  countries = Util.countries
  studentList: any = []
  loading: boolean = false;
  error: boolean = false;
  message: string = '';
  imgUrl = Constant.IMAGE_URL
  searchKey: string = ''; 
  listData!: MatTableDataSource<any> 
  studentList$!: Observable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  pageStatus: any;
  newStart: number = 0;
  newError: boolean = false;
  isEmptyList: any;
  moreLoading: boolean = false;
  newArray: any;

  constructor(private app: AppService, private changeDetectorRef: ChangeDetectorRef) { 
    this.app.getMgtPosition().subscribe((el)=>{
      if(el.type == 'teacher'){
        this.onScroll(el)
      }
    })
  }

  ngOnInit(): void {
    this.getTeachers()
  }

  getTeachers(){
    this.loading = true

    let page = this.pageStatus ? this.pageStatus.pageIndex : Constant.PAGE;
    let size = this.pageStatus ? this.pageStatus.pageSize : Constant.MINI_SIZE;

    let payload: fetchAllStaff = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      staff_id: this.app.utilities.getUserId(),
      staff_type: this.app.utilities.getUserType(),
      start: page,
      length: size
    }

    this.app.managementService.fetchAllStaff(payload)
    .subscribe({
      next: (res: any) => {
        this.loading = false
        this.error = false
        this.studentList = res
        this.listData = new MatTableDataSource(this.studentList)
        this.setPaginator()
        this.message = ''
      },

      error: (error) => {
        this.loading = false
        this.error = true
        this.message = typeof error == 'string' ? error : error.message
      }
    });
  }

  setPaginator(){
    this.changeDetectorRef.detectChanges();
    this.listData.paginator = this.paginator;
    this.studentList$ = this.listData.connect(); 
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase()
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

  checkPage(event: any){
    this.pageStatus = event
    this.getTeachers()
  }

  onScroll(event: any) {   
    if (event.offset + event.scroll >= event.height) {
      this.newError = false
      this.newStart += 10

      if(!this.isEmptyList){
        this.moreLoading = true
        let payload: fetchAllStaff = {
          school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
          staff_id: this.app.utilities.getUserId(),
          staff_type: this.app.utilities.getUserType(),
          start: this.newStart,
          length: Constant.MINI_SIZE
        }
        this.app.managementService.fetchAllStaff(payload)
        .subscribe({
          next: (res: any) => {
            this.message = ''
            this.newArray = res
            this.moreLoading = true
            if(this.newArray.length == 0){
              this.moreLoading = false
              this.isEmptyList = true
            }
            
            else{
              this.isEmptyList = false
              for (let i = 0; i < this.newArray.length; i++) {
                this.studentList.push(res[i]) 
              }
              this.setPaginator()
            }
            
          },
    
          error: (error) => {
            this.moreLoading = true
            this.newError = true
            this.app.snackbar.open(typeof error == 'string' ? error : error.message,  'Dismiss', {
              duration:Constant.TIMEOUT_DURATION
            })
          }
        });
      }

      else{
        this.app.snackbar.open('No more feed',  'Dismiss', {
          duration:Constant.TIMEOUT_DURATION
        })
      }
      
    }
  }

}
