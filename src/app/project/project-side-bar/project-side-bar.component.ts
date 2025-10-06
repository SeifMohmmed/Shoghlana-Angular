import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICategory } from '../../Shared/Models/Category/ICategory';
import { CategoryService } from '../../Shared/Services/category.service';
import { IJob } from '../../Shared/Models/Job/IJob';
import { SearchStatus } from '../../Shared/Enums/SearchStatus/SearchStatus';
import { JobService } from '../../job/job.service';

@Component({
  selector: 'app-project-side-bar',
  templateUrl: './project-side-bar.component.html',
  styleUrl: './project-side-bar.component.scss',
})
export class ProjectSideBarComponent implements OnInit {
  categories: ICategory[] = [];
  selectedCategories: ICategory[] = [];
  minBudget: number = 0;
  maxBudget: number = 10000;
  searchKeyword: string = '';
  searchResultJobArr: IJob[] = [];
  searchStatus: SearchStatus = SearchStatus.Ignored;

  @Output() FiltersChangedEvent: EventEmitter<
    [ICategory[], number, number, IJob[], SearchStatus]
  > = new EventEmitter<[ICategory[], number, number, IJob[], SearchStatus]>();

  constructor(
    private categoryService: CategoryService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.fetchAllCategories();
  }

  fetchAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log('Fetching All categories');
          console.log('res', res.data);
          this.categories = res.data || [];
          console.log('categories', this.categories);
        } else {
          console.error('Response Failed: ', res);
        }
      },
      error: (err) => {
        console.error('Error fetching Categories', err);
      },
    });
  }

  search() {
    if (this.searchKeyword.trim() === '') {
      console.log('No keyword to search');
      this.searchStatus = SearchStatus.Ignored;
      return;
    }

    this.jobService.searchByJobTitle(this.searchKeyword).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log('Search Success');
          console.log('search result :', res.data);
          console.log('server message :', res.message);
          this.searchResultJobArr = res.data;
          this.searchStatus = SearchStatus.Found;
          this.invokeFiltersEventToParent();
        } else {
          console.log('Search word not found');
          console.log('search result :', res.data);
          console.log('server message :', res.message);
          this.searchStatus = SearchStatus.NotFound;
          this.invokeFiltersEventToParent();
        }
      },
      error: (err) => {
        console.error('Error while searching');
        console.error('Error : ', err);
      },
    });
  }

  getSelectedCategories(): ICategory[] {
    return this.categories.filter((cat) => cat.selected);
  }

  resetFilters() {
    this.maxBudget = 0;
    this.maxBudget = 10000;
    this.categories.forEach((cat) => (cat.selected = false));
    this.selectedCategories = [];
    this.searchKeyword = '';
    this.searchResultJobArr = [];
    this.searchStatus = SearchStatus.Ignored;
    this.invokeFiltersEventToParent();
  }

  applyFilters() {
    this.invokeFiltersEventToParent();
  }

  categorySelected() {
    this.invokeFiltersEventToParent();
  }

  invokeFiltersEventToParent() {
    this.FiltersChangedEvent.emit([
      this.getSelectedCategories(),
      this.minBudget,
      this.maxBudget,
      this.searchResultJobArr,
      this.searchStatus,
    ]);
    this.searchStatus = SearchStatus.Ignored; // changing it back to default after invoking
  }
}
