import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-complete-signup',
  templateUrl: './complete-signup.component.html',
  styleUrls: ['./complete-signup.component.scss']
})
export class CompleteSignupComponent implements OnInit {
  firstName: string = this.app.utilities.getUserFirstName();
  lastName: string = this.app.utilities.getUserLastName();
  userName: string = this.app.utilities.getUserName();
  userType: number = this.app.utilities.getUserType();

  constructor(private app: AppService) { }

  ngOnInit(): void {
  }

}
