import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
import { SearchStatus } from '../../Shared/Enums/SearchStatus/SearchStatus';

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
  maxBudget: number = 10000;
  clientId: number = 0;
  freelancerId: number = 0;
  HasManyProposals: boolean = false;
  IsNew: boolean = true;
  searchResultJobsArr: IJob[] = [];
  searchStatus: SearchStatus = SearchStatus.Ignored;
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
    private router: Router,
    private cdr: ChangeDetectorRef
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
        this.HasManyProposals,
        this.IsNew,
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

  selectNewOption(isNew: boolean): void {
    this.IsNew = isNew;
    this.fetchPaginatedJobs();
    this.cdr.detectChanges();
  }

  selectProposalOption(hasManyProposals: boolean): void {
    this.HasManyProposals = hasManyProposals;
    this.fetchPaginatedJobs();
    this.cdr.detectChanges();
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

  filterProjects(
    event: [ICategory[], number, number, IJob[], SearchStatus]
  ): void {
    const [
      selectedCategories,
      selectedMinBudget,
      selectedMaxBudget,
      searchResultJobsArr,
      searchStatus,
    ] = event;

    this.selectedCategories = selectedCategories;
    this.selectedCategoriesIDs = selectedCategories.map((c) => c.id);
    this.requestBody.CategoriesIDs = this.selectedCategoriesIDs;
    this.minBudget = selectedMinBudget;
    this.maxBudget = selectedMaxBudget;
    this.currentPage = 1; // always return to the first page if a new filteraion is applied
    this.searchResultJobsArr = searchResultJobsArr;
    this.searchStatus = searchStatus;

    if (searchStatus == SearchStatus.Ignored) {
      console.log('Parent : Search Ignored');
      this.fetchPaginatedJobs();
    } else if (searchStatus == SearchStatus.Found) {
      console.log('Parent : Search Found');

      this.filteredJobs = searchResultJobsArr;

      this.totalItems = searchResultJobsArr.length;

      this.pageSize = this.totalItems; // here because I dont want to use pagination (the API doesn't implement pagination at search for now)

      this.filteredJobs.forEach((job) => {
        job.postTime =
          this.datePipe.transform(job.postTime, 'medium') || 'Invalid Date';
      });
    } // not found
    else {
      console.log('Parent : Search Not found');

      this.filteredJobs = [];
    }
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
