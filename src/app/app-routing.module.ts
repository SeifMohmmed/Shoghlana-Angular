import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';

const routes: Routes = [
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
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
