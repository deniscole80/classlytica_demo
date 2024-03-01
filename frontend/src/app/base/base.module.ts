import { NgModule } from '@angular/core';
import { BaseRoutingModule } from './base-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SidenavComponent,
  ],
  imports: [
    BaseRoutingModule,
    SharedModule,
  ]
})
export class BaseModule { }
