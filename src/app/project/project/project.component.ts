import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICategory } from '../../Shared/Models/Category/ICategory';
import { IClientJob } from '../../Shared/Models/Client/IClient-Job';
import { Router } from '@angular/router';
import { ClientJobService } from '../../client/clientJob.service';
import { ProjectService } from '../project.service';
import { JobStatus } from '../../Shared/Enums/JobStatus/JobStatus';
import { DatePipe } from '@angular/common';
import { IJob } from '../../Shared/Models/Job/IJob';
import { IPaginatedJobsRequestBody } from '../../Shared/Models/PaginatedJobs/PaginatedJobsRequestBody';
import { JobService } from '../../job/job.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  providers: [DatePipe],
})
export class ProjectComponent implements OnInit {
  JobStatus = JobStatus;
  //clientJob: IClientJob[];

  //filteredJobs: IClientJob[];
  selectedCategories: ICategory[] = [];
  selectedCategoriesIDs: number[] = [];
  jobs: IJob[] = [];
  categories: ICategory[] = [];
  filteredJobs: IJob[] = [];
  selectedCategoryId: number = 0;
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  minBudget: number = 0;
  maxBudget: number = 0;
  clientId: number = 0;
  freelancerId: number = 0;
  noJobsAvailable: boolean = false;
  jobsStatus: JobStatus = JobStatus.Active;
  requestBody: IPaginatedJobsRequestBody = {
    CategoriesIDs: [],
    Includes: [],
  };

  constructor(
    private jobService: JobService,
    private projectService: ProjectService,
    private datePipe: DatePipe,
    private clientJobService: ClientJobService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPaginatedJobs();
  }
  fetchPaginatedJobs() {
    this.noJobsAvailable = false;

    this.jobService
      .getPaginatedJobs(
        this.minBudget,
        this.maxBudget,
        this.clientId,
        this.freelancerId,
        this.currentPage,
        this.pageSize,
        this.jobsStatus,
        this.requestBody
      )
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            console.log('Pageination Successed');
            console.log(res);

            this.filteredJobs = res.data.items;

            this.totalItems = res.data.totalItems || 0;

            this.filteredJobs.forEach((job) => {
              job.postTime =
                this.datePipe.transform(job.postTime, 'medium') ||
                'Invalid Date';
            });
          } else {
            this.noJobsAvailable = true;
            console.error('Response failed:', res);
          }
        },
        error: (err) => {
          console.error('Error fetching categoires', err);
        },
      });
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchPaginatedJobs();
  }

  onStatusChange(status: JobStatus) {
    this.jobsStatus = status;
    this.fetchPaginatedJobs();
  }

  onCategorySelect(categoryId: number) {
    this.selectedCategoryId = categoryId;
    this.currentPage = 1; // returning it to first page in the new filteration
    this.fetchPaginatedJobs();
  }

  // Method to calculate the ceiling of division
  calculateTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  filterProjects(event: [ICategory[], number, number]): void {
    const [selectedCategories, selectedMinBudget, selectedMaxBudget] = event;

    this.selectedCategories = selectedCategories;
    this.selectedCategoriesIDs = selectedCategories.map((c) => c.id);
    this.requestBody.CategoriesIDs = this.selectedCategoriesIDs;
    this.minBudget = selectedMinBudget;
    this.maxBudget = selectedMaxBudget;
    this.currentPage = 1; // always return to the first page if a new filteraion is applied

    this.fetchPaginatedJobs();
  }

  navigateToDetails(id: number): void {
    this.projectService.getById(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log('Project Details: ', res.data);
          this.router.navigate(['project', id]);
        } else {
          console.error('Unexpected response structure: ', res);
        }
      },
      error: (err) => console.log(err),
    });
  }
}
