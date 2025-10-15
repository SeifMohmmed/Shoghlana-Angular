import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './Guards/auth.guard';
import { freelancerGuard } from './Guards/freelancer.guard';
import { clientGuard } from './Guards/client.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [authGuard],
  },

  {
    path: 'account',
    loadChildren: () =>
      import('./identity/identity.module').then((m) => m.IdentityModule),
  },

  {
    path: 'freelancers',
    canActivate: [clientGuard],
    loadChildren: () =>
      import('./freelancers/freelancers.module').then(
        (m) => m.FreelancersModule
      ),
  },

  {
    path: 'jobs',
    loadChildren: () => import('./job/job.module').then((m) => m.JobModule),
  },

  {
    path: 'project',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },

  {
    path: 'client',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },

  {
    path: 'offers',
    canActivate: [freelancerGuard],
    loadChildren: () =>
      import('./offers/offers.module').then((m) => m.OffersModule),
  },

  {
    path: 'addservice',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./addservice/addservice.module').then((m) => m.AddserviceModule),
  },

  {
    path: 'live',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./signal-r/signal-r.module').then((m) => m.SignalRModule),
  },

  {
    path: 'addservice',
    canActivate: [freelancerGuard],
    loadChildren: () =>
      import('./addservice/addservice.module').then((m) => m.AddserviceModule),
  },

  {
    path: 'galleryworks',
    //canActivate: [freelancerGuard],
    loadChildren: () =>
      import('./work-gallary/work-gallary.module').then(
        (m) => m.WorkGallaryModule
      ),
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
