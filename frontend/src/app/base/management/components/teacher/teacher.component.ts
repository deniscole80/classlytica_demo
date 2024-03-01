import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  constructor(private app: AppService) { }

  ngOnInit(): void {
  }

  onScroll(event: any){
    let scrollData = {
      offset: event.target.offsetHeight,
      scroll: event.target.scrollTop,
      height: event.target.scrollHeight,
      type: 'teacher'
    }

    this.app.setMgtPosition(scrollData)
  }
}
