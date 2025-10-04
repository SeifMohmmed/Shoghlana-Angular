import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancersComponent } from './freelancers/freelancers.component';
import { FreelancerPortfolioComponent } from './freelancer-portfolio/freelancer-portfolio.component';
import { FreelancerWorkHistoryComponent } from './freelancer-work-history/freelancer-work-history.component';
import { FreelancerProfileComponent } from './freelancer-profile/freelancer-profile.component';
import { FreelancerEditProfileComponent } from './freelancer-edit-profile/freelancer-edit-profile.component';
import { WorkComponent } from './work/work.component';
import { authGuard } from '../Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FreelancersComponent,
    canActivate: [authGuard],
  },

  {
    path: ':id',
    component: FreelancerProfileComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
      { path: 'portfolio', component: FreelancerPortfolioComponent },
      { path: 'workhistory', component: FreelancerWorkHistoryComponent },
      { path: 'edit', component: FreelancerEditProfileComponent },
      { path: 'works', component: WorkComponent, canActivate: [authGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreelancersRoutingModule {}
