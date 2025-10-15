import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddprojectComponent } from './addproject/addproject.component';
import { authGuard } from '../Guards/auth.guard';
import { freelancerGuard } from '../Guards/freelancer.guard';

const routes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    canActivate: [authGuard],
  },

  {
    path: ':id',
    component: ProjectDetailsComponent,
  },

  {
    path: 'addproject',
    canActivate: [freelancerGuard],
    component: AddprojectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
