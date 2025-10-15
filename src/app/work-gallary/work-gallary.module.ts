import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { WorkGallaryRoutingModule } from './work-gallary-routing.module';
import { WorkGallaryComponent } from './work-gallary/work-gallary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkGallaryComponent],
  imports: [
    CommonModule,
    WorkGallaryRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class WorkGallaryModule {}
