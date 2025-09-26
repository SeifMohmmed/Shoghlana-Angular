import { Component } from '@angular/core';
import { ICategory } from '../../Shared/Models/Category/ICategory';
import { IClientJob } from '../../Shared/Models/Client/IClient-Job';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  category: ICategory[];
  selectedCategoryID: number = 0;
  ClientJob: IClientJob[];

  constructor() {
    this.category = [
      { id: 1, name: 'أعمال وخدمات ادارية واستشارية' },
      { id: 2, name: 'برمجة, تطوير المواقع و التطبيقات' },
      { id: 3, name: 'تصميم' },
      { id: 4, name: 'فيديو' },
      { id: 5, name: 'كتابة و ترجمة ولغات' },
    ];
    this.ClientJob = [
      {
        id: 1,
        title: 'مطلوب متخصص لعمل اسكربت علي موقع حجز مواعيد تأشيرة',
        MinPrice: '25$',
        MaxPrice: '50$',
        status: 'مفتوح',
        clientName: 'منار',
        clientImg: '../../assets/Images/Nerd-amico.png',
        catID: 1,
      },
      {
        id: 2,
        title: ' تعديلات و إعادة تصميم موقع ووردبريس',
        MinPrice: '10$',
        MaxPrice: '30$',
        status: 'مغلق',
        clientName: 'أحمد',
        clientImg: '../../assets/Images/Nerd-amico.png',
        catID: 2,
      },
      {
        id: 3,
        title: 'موقع ومتجر إلكتروني لجمعية خيرية',
        MinPrice: '20$',
        MaxPrice: '40$',
        status: 'مفتوح',
        clientName: 'سارة',
        clientImg: '../../assets/Images/Nerd-amico.png',
        catID: 3,
      },
    ];
  }
}
