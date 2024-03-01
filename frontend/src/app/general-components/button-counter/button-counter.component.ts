import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-counter',
  templateUrl: './button-counter.component.html',
  styleUrls: ['./button-counter.component.scss']
})
export class ButtonCounterComponent implements OnInit {
  @Input() image!: string;
  @Input() count!: number;
  @Input() width!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
