import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ICategory } from '../../Shared/Models/Category/ICategory';
import { IClientJob } from '../../Shared/Models/Client/IClient-Job';
import { ClientService } from '../../client/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnChanges {
  clientJob: IClientJob[];
  filteredJobs: IClientJob[];
  selectedCategories: number[] = [];

  constructor(private clientService: ClientService, private router: Router) {
    this.clientJob = this.clientService.getAllClientJobs();
    this.filteredJobs = [...this.clientJob];
  }

  ngOnChanges() {
    this.filteredJobs = this.clientService.filterProjects(
      this.selectedCategories
    );
  }

  filterProjects(selectedCategories: number[]) {
    this.selectedCategories = selectedCategories;
    this.filteredJobs = this.clientService.filterProjects(
      this.selectedCategories
    );
  }

  navigateToDetails(id: Number) {
    this.router.navigateByUrl(`/project/${id}`);
  }
}
