import { Component, EventEmitter, Output } from '@angular/core';
import { ICategory } from '../../Shared/Models/Category/ICategory';

@Component({
  selector: 'app-project-side-bar',
  templateUrl: './project-side-bar.component.html',
  styleUrl: './project-side-bar.component.scss',
})
export class ProjectSideBarComponent {
  category: ICategory[];

  @Output() categorySelectedChanged: EventEmitter<number[]>;

  constructor() {
    this.category = [
      {
        id: 1,
        title: 'أعمال وخدمات ادارية واستشارية',
        selected: false,
        description: '',
      },
      {
        id: 2,
        title: 'برمجة, تطوير المواقع و التطبيقات',
        selected: false,
        description: '',
      },
      { id: 3, title: 'تصميم', selected: false, description: '' },
      { id: 4, title: 'فيديو', selected: false, description: '' },
      { id: 5, title: 'كتابة و ترجمة ولغات', selected: false, description: '' },
    ];
    this.categorySelectedChanged = new EventEmitter<number[]>();
  }

  getSelectedCategories(): number[] {
    return this.category.filter((cat) => cat.selected).map((cat) => cat.id);
  }

  categorySelected() {
    this.categorySelectedChanged.emit(this.getSelectedCategories());
  }
}
