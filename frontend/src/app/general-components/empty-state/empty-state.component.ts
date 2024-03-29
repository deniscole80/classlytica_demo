import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {
  @Input() message!: string;
  @Input() image: string = '';
  @Input() width!: number;

  
  constructor() { }

  ngOnInit(): void {
  }

}
