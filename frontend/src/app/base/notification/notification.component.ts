import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notificationType: any[] = [
    {label: 'Likes', activeIcon: '/assets/images/like_active.svg', inactiveIcon: '/assets/images/like_inactive.svg', route: '/app/notifications/likes'},
    {label: 'Comments', activeIcon: '/assets/images/comment_active.svg', inactiveIcon: '/assets/images/comment_inactive.svg', route: '/app/notifications/comments'},
    {label: 'Follow', activeIcon: '/assets/images/follow_active.svg', inactiveIcon: '/assets/images/follow_inactive.svg', route: '/app/notifications/follow'},
    {label: 'Others', activeIcon: '/assets/images/all_active.svg', inactiveIcon: '/assets/images/all_inactive.svg', route: '/app/notifications/all'},
  ]
  type: string = 'Likes';

  constructor(private app: AppService) { }

  ngOnInit(): void {
  }

  setType(tab: any){
    this.type = tab.label
  }

  onScroll(event: any){
    let scrollData = {
      offset: event.target.offsetHeight,
      scroll: event.target.scrollTop,
      height: event.target.scrollHeight,
      type: this.type
    }

    this.app.setNotificationPosition(scrollData)
  }

}
