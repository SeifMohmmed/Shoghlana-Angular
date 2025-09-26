import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job/job.component';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from '../Shared/Directives/highlight.directive';

@NgModule({
  declarations: [JobComponent],
  imports: [CommonModule, JobRoutingModule, FormsModule, HighlightDirective],
  exports: [JobComponent],
})
export class JobModule {}
