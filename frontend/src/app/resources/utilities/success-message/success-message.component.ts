import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.scss']
})
export class SuccessMessageComponent implements OnInit {

receivedData:any = this.router.getCurrentNavigation()?.extras.state

  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  login(){
    this.router.navigate(["/"]);
  }
}
