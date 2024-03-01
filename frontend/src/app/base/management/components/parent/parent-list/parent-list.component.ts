import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { Constant, Util } from 'src/app/resources/constants/constants';
import { fetchAllParents } from '../../../models/management.model';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.scss']
})
export class ParentListComponent implements OnInit {
  loading: boolean = false;
  countries = Util.countries;
  imgUrl = Constant.IMAGE_URL
  studentList: any = [];
  studentList$!: Observable<any>;
  listData!: MatTableDataSource<any>
  message: any = '';
  error: boolean = false;
  searchKey: string = '';  
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  
  constructor(private app: AppService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getParents()
  }

  getParents(){
    this.loading = true

    let payload: fetchAllParents = {
      school_id: this.app.utilities.getUserType() == 1 ? this.app.utilities.getUserId() : this.app.utilities.getSchoolId(),
      staff_id: this.app.utilities.getUserId(),
      staff_type: 1,
      start: Constant.PAGE,
      length: Constant.MINI_SIZE
    }

    this.app.managementService.fetchAllParents(payload)
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

}
