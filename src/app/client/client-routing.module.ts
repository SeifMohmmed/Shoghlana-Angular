import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
  },

  {
    path: ':id',
    component: ClientProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
