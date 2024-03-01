import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SetProfilePicComponent } from '../../../general-components/set-profile-pic/set-profile-pic.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  step: number = 1;

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  stepNumber(nextStep: number){
    this.step = nextStep;
    

    if(this.step > 3){   
      localStorage.removeItem('interest')  
      this.router.navigateByUrl("/app")
    }

  }

}
