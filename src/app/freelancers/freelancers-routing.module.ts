import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancersComponent } from './freelancers/freelancers.component';
import { FreelancerPortfolioComponent } from './freelancer-portfolio/freelancer-portfolio.component';
import { FreelancerWorkHistoryComponent } from './freelancer-work-history/freelancer-work-history.component';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';

const routes: Routes = [
  {
    path: '',
    component: FreelancersComponent,
  },

  {
    path: ':id',
    component: FreelancerProfileComponent,
    children: [
      { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
      { path: 'portfolio', component: FreelancerPortfolioComponent },
      { path: 'workhistory', component: FreelancerWorkHistoryComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancersRoutingModule {}
