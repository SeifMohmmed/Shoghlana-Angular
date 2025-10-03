import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project/project.component';
import { ProjectSideBarComponent } from './project-side-bar/project-side-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AddprojectComponent } from './addproject/addproject.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectSideBarComponent,
    ProjectDetailsComponent,
    AddprojectComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProjectModule {}
