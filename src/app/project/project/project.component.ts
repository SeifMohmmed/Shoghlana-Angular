import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ICategory } from '../../Shared/Models/Category/ICategory';
import { IClientJob } from '../../Shared/Models/Client/IClient-Job';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnChanges {
  clientJob: IClientJob[];
  filteredJobs: IClientJob[];
  selectedCategories: number[] = [];

  constructor(private clientService: ClientService) {
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
}
