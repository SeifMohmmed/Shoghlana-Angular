import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkGallaryRoutingModule } from './work-gallary-routing.module';
import { WorkGallaryComponent } from './work-gallary/work-gallary.component';

@NgModule({
  declarations: [WorkGallaryComponent],
  imports: [CommonModule, WorkGallaryRoutingModule],
})
export class WorkGallaryModule {}
