import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-progress-bar',
  templateUrl: './custom-progress-bar.component.html',
  styleUrls: ['./custom-progress-bar.component.scss']
})
export class CustomProgressBarComponent implements OnInit {
  @Input() percentage: number = 0;
  @Input() isSolid: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
