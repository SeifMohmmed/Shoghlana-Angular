import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancersRoutingModule } from './freelancers-routing.module';
import { FreelancersComponent } from './freelancers/freelancers.component';

@NgModule({
  declarations: [FreelancersComponent],
  imports: [CommonModule, FreelancersRoutingModule],
  exports: [FreelancersComponent],
})
export class FreelancersModule {}
