import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project/project.component';
import { ProjectSideBarComponent } from './project-side-bar/project-side-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectComponent, ProjectSideBarComponent],
  imports: [CommonModule, ProjectRoutingModule, FormsModule],
})
export class ProjectModule {}
