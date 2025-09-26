import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project/project.component';
import { ProjectSideBarComponent } from './project-side-bar/project-side-bar.component';
import { FormsModule } from '@angular/forms';
import { ProjectDetailsComponent } from './project-details/project-details.component';

@NgModule({
  declarations: [ProjectComponent, ProjectSideBarComponent, ProjectDetailsComponent],
  imports: [CommonModule, ProjectRoutingModule, FormsModule],
})
export class ProjectModule {}
