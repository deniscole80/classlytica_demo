import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-blue',
  templateUrl: './sidebar-blue.component.html',
  styleUrls: ['./sidebar-blue.component.scss']
})
export class SidebarBlueComponent implements OnInit {
  signupType: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
