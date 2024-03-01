import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-follow-count',
  templateUrl: './follow-count.component.html',
  styleUrls: ['./follow-count.component.scss']
})
export class FollowCountComponent implements OnInit {
  @Input() text: string = '';
  @Input() count: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
