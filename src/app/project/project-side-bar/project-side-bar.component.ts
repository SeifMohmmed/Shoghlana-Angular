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
      { id: 1, name: 'أعمال وخدمات ادارية واستشارية', selected: false },
      { id: 2, name: 'برمجة, تطوير المواقع و التطبيقات', selected: false },
      { id: 3, name: 'تصميم', selected: false },
      { id: 4, name: 'فيديو', selected: false },
      { id: 5, name: 'كتابة و ترجمة ولغات', selected: false },
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
