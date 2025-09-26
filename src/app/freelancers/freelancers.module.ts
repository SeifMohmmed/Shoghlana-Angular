import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancersRoutingModule } from './freelancers-routing.module';
import { FreelancersComponent } from './freelancers/freelancers.component';
import { FreelancerPortfolioComponent } from './freelancer-portfolio/freelancer-portfolio.component';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import { FreelancerWorkHistoryComponent } from './freelancer-work-history/freelancer-work-history.component';

@NgModule({
  declarations: [FreelancersComponent, FreelancerPortfolioComponent, FreelancerProfileComponent, FreelancerWorkHistoryComponent],
  imports: [CommonModule, FreelancersRoutingModule],
  exports: [FreelancersComponent],
})
export class FreelancersModule {}
