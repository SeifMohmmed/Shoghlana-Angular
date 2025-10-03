import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICategory } from '../../Shared/Models/Category/ICategory';
import { CategoryService } from '../../Shared/Services/category.service';

@Component({
  selector: 'app-project-side-bar',
  templateUrl: './project-side-bar.component.html',
  styleUrl: './project-side-bar.component.scss',
})
export class ProjectSideBarComponent implements OnInit {
  categories: ICategory[];
  selectedCategories: ICategory[];
  minBudget: number = 0;
  maxBudget: number = 0;

  @Output() FiltersChangedEvent: EventEmitter<[ICategory[], number, number]> =
    new EventEmitter<[ICategory[], number, number]>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.fetchAllCategories();
    this.categories = this.selectedCategories;
  }

  fetchAllCategories() {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.selectedCategories = res.data || [];
        } else {
          console.error('Response Failed: ', res);
        }
      },
      error: (err) => {
        console.error('Error fetching Categories', err);
      },
    });
  }

  getSelectedCategories(): ICategory[] {
    return this.categories.filter((cat) => cat.selected);
  }

  resetFilters() {
    this.maxBudget = 0;
    this.maxBudget = 0;
    this.categories.forEach((cat) => (cat.selected = false));
    this.selectedCategories = [];
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
    ]);
  }
}
