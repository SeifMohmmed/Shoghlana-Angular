import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancersRoutingModule } from './freelancers-routing.module';
import { FreelancersComponent } from './freelancers/freelancers.component';
import { FreelancerPortfolioComponent } from './freelancer-portfolio/freelancer-portfolio.component';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import { FreelancerWorkHistoryComponent } from './freelancer-work-history/freelancer-work-history.component';
import { FreelancerEditProfileComponent } from './freelancer-edit-profile/freelancer-edit-profile.component';
import { WorkComponent } from './work/work.component';

@NgModule({
  declarations: [FreelancersComponent, FreelancerPortfolioComponent, FreelancerProfileComponent, FreelancerWorkHistoryComponent, FreelancerEditProfileComponent, WorkComponent],
  imports: [CommonModule, FreelancersRoutingModule],
  exports: [FreelancersComponent],
})
export class FreelancersModule {}
