import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddserviceRoutingModule } from './addservice-routing.module';
import { AddserviceComponent } from './addservice/addservice.component';


@NgModule({
  declarations: [
    AddserviceComponent
  ],
  imports: [
    CommonModule,
    AddserviceRoutingModule
  ]
})
export class AddserviceModule { }
