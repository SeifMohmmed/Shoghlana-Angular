import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
  },

  {
    path: 'Account',
    loadChildren: () =>
      import('./identity/identity.module').then((m) => m.IdentityModule),
  },

  {
    path: 'freelancers',
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
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },

  {
    path: 'client',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
  },

  {
    path: 'offers',
    loadChildren: () =>
      import('./offers/offers.module').then((m) => m.OffersModule),
  },

  {
    path: 'addservice',
    loadChildren: () =>
      import('./addservice/addservice.module').then((m) => m.AddserviceModule),
  },

  {
    path: 'live',
    loadChildren: () =>
      import('./signal-r/signal-r.module').then((m) => m.SignalRModule),
  },

  {
    path: 'addservice',
    loadChildren: () =>
      import('./addservice/addservice.module').then((m) => m.AddserviceModule),
  },

  {
    path: 'galleryworks',
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
