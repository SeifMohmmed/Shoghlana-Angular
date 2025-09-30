import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICategory } from '../../Shared/Models/Category/ICategory';
import { IClientJob } from '../../Shared/Models/Client/IClient-Job';
import { Router } from '@angular/router';
import { ClientJobService } from '../../client/clientJob.service';
import { ProjectService } from '../project.service';
import { JobStatus } from '../../Shared/Enums/JobStatus/JobStatus';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent implements OnInit {
  clientJob: IClientJob[] = [] as IClientJob[];
  JobStatus = JobStatus;
  selectedCategories: number[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe({
      next: (res) => {
        if (res.isSuccess && Array.isArray(res.data)) {
          this.clientJob = res.data;
          console.log('title ', res.data);
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err),
    });
  }

  navigateToDetails(id: Number) {
    this.router.navigateByUrl(`/project/${id}`);
  }
}
