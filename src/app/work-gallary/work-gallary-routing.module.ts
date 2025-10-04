import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkGallaryComponent } from './work-gallary/work-gallary.component';
import { authGuard } from '../Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WorkGallaryComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkGallaryRoutingModule {}
