import { Component, OnInit } from '@angular/core';
import { IJob } from '../../Shared/Models/Job/IJob';
import { ICategory } from '../../Shared/Models/Category/ICategory';
import { JobService } from '../job.service';
import { CategoryService } from '../../Shared/Services/category.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
  providers: [DatePipe],
})
export class JobComponent implements OnInit {
  jobs: IJob[] = [];
  categories: ICategory[] = [];
  filteredJobs: IJob[] = [];
  selectedCategoryID: number = 0;
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  minBudget: number = 0;
  maxBudget: number = 0;
  noJobsAvailable: boolean = false;

  constructor(
    private jobService: JobService,
    private categoryService: CategoryService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.fetchAllCategories();
    this.fetchPaginatedJobs();
  }

  fetchAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.categories = res.data || [];
        } else {
          console.error('Response Failed: ', res);
        }
      },
      error: (err) => {
        console.error('Error Fetching Categories', err);
      },
    });
  }

  fetchPaginatedJobs() {
    this.noJobsAvailable = false;
    this.jobService
      .getPaginatedJobs(
        this.currentPage,
        this.pageSize,
        this.selectedCategoryID,
        this.minBudget,
        this.maxBudget
      )
      .subscribe({
        next: (res) => {
          if (res.isSuccess) {
            console.log('Pagination Success');
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
            console.error('Response Failed: ', res);
          }
        },
        error: (err) => {
          console.error('Error Fetching Categories', err);
        },
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.fetchPaginatedJobs();
  }

  // Method to calculate the ceiling of division
  calculateTotalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  fetchAllJobs() {
    this.jobService.getAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.jobs = res.data || [];

          // Formatting the postTime for each job
          this.jobs.forEach((job) => {
            job.postTime =
              this.datePipe.transform(job.postTime, 'medium') || 'Invalid Date';
          });

          console.log('Angular Jobs : ');
          console.log(this.jobs);
        } else {
          console.error('Response failed:', res);
        }
      },
      error: (err) => {
        console.error('Error fetching jobs', err);
      },
    });
  }

  onCategorySelect(categoryId: number) {
    this.selectedCategoryID = categoryId;
    this.currentPage = 1; // returning it to first page in the new filteration
    this.fetchPaginatedJobs();
  }

  applyFilters() {
    this.fetchPaginatedJobs();
  }

  resetFilters() {
    this.minBudget = 0;
    this.maxBudget = 0;
    this.selectedCategoryID = 0;
    this.currentPage = 1;
    this.noJobsAvailable = false;
    this.fetchPaginatedJobs(); // Apply filters after resetting
  }
}
