import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { PhotoUploadComponent } from './components/photo-upload/photo-upload.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { VideoUploadComponent } from './components/video-upload/video-upload.component';
import { CommentUploadComponent } from './components/comment-upload/comment-upload.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentPostComponent } from './components/comment-post/comment-post.component';


@NgModule({
  declarations: [
    FeedComponent,
    PhotoUploadComponent,
    MainSectionComponent,
    VideoUploadComponent,
    CommentUploadComponent,
    CommentPostComponent,
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,
    SharedModule
  ]
})
export class FeedModule { }
