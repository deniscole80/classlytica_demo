import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/http-interceptor';
import { ViewCvComponent } from './general-components/view-cv/view-cv.component';
import { AcceptRequestComponent } from './general-components/accept-request/accept-request.component';
import { DeclineRequestComponent } from './general-components/decline-request/decline-request.component';
import { TakeActionComponent } from './general-components/take-action/take-action.component';
import { ErrorPageComponent } from './general-components/error-page/error-page.component';
import { ImageViewComponent } from './general-components/image-view/image-view.component';
@NgModule({
  declarations: [
    AppComponent,
    AcceptRequestComponent,
    DeclineRequestComponent,
    TakeActionComponent,
    ErrorPageComponent,
    ImageViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
