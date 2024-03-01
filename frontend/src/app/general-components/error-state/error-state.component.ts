import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.component.html',
  styleUrls: ['./error-state.component.scss']
})
export class ErrorStateComponent implements OnInit {
  @Input() message!: string;
  @Output() private retry:EventEmitter<any> = new EventEmitter()
  @Input() width!: number;

  constructor(private app: AppService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.message, 'are you there');

    if(this.message == 'Bad authentication' || this.message == 'No authentication'){
      this.app.exit()
    }
    
  }

  retryCall(){
    this.retry.emit()
  }

}
