import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { materials } from './angular-material/material-modules';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppLoaderComponent } from '../general-components/app-loader/app-loader.component';
import { ErrorStateComponent } from '../general-components/error-state/error-state.component';
import { CustomProgressBarComponent } from '../general-components/custom-progress-bar/custom-progress-bar.component';
import { EmptyStateComponent } from '../general-components/empty-state/empty-state.component';
import { ButtonCounterComponent } from '../general-components/button-counter/button-counter.component';
import { SetProfilePicComponent } from '../general-components/set-profile-pic/set-profile-pic.component';
import { ChatActiveComponent } from '../general-components/chat-active/chat-active.component';
import { FollowCountComponent } from '../general-components/follow-count/follow-count.component';
import { MainLoaderComponent } from '../general-components/main-loader/main-loader.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ViewCvComponent } from '../general-components/view-cv/view-cv.component';
import { LimitTextDirective } from '../directives/limit-text.directive';
import { TextChange } from '../pipes/text.format';


@NgModule({
  declarations: [
    AppLoaderComponent,
    ErrorStateComponent,
    CustomProgressBarComponent,
    EmptyStateComponent,
    SetProfilePicComponent,
    ButtonCounterComponent,
    ChatActiveComponent,
    MainLoaderComponent,
    FollowCountComponent,
    ViewCvComponent,

    LimitTextDirective,
    TextChange,
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    ...materials
  ],


  exports: [
    ErrorStateComponent,
    AppLoaderComponent,
    EmptyStateComponent,
    CustomProgressBarComponent,
    ButtonCounterComponent,
    ChatActiveComponent,
    FollowCountComponent,
    MainLoaderComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    SetProfilePicComponent,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    ViewCvComponent,


    LimitTextDirective,
    TextChange,
    ...materials,
  ],

  providers: [
    // { provide: MatDialogRef, useValue: {} },
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule
    };
  }
}
