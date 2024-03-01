import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.scss']
})
export class MainSectionComponent implements OnInit {
  @Output() type = new EventEmitter<{type: string, message: string}>();
  text: string = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addComment(){
    this.type.emit({type: 'comment', message: this.text})
  }

  addPhoto(){
    this.type.emit({type: 'photo', message: this.text})
  }

  addVideo(){
    this.type.emit({type: 'video', message: this.text})
  }

  searchUser(){
    this.router.navigateByUrl('/app/search')
  }

}
