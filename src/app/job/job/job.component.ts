import { Component, OnInit } from '@angular/core';
import { IJob } from '../../Shared/Models/Job/IJob';
import { ICategory } from '../../Shared/Models/Category/ICategory';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent {
  jobs: IJob[];
  category: ICategory[];
  filteredJobs: IJob[];
  selectedCategoryID: Number = 0;

  constructor() {
    (this.jobs = [
      {
        id: 1,
        freelancerName: 'محمد صلاح',
        freelancerImg: 'src=../../assets/Images/Nerd-amico.png',
        title: 'تصميم شعار احترافى ومميز',
        description: 'تصميم واعمال فنيه واحترافيه',
        price: '25$',
        imgURL: 'src=../../assets/Images/Nerd-amico.png',
        rate: 5,
        catID: 1,
      },
      {
        id: 2,
        freelancerName: 'محمد صلاح',
        freelancerImg: 'src=../../assets/Images/Nerd-amico.png',
        title: 'تصميم بوستر اعلانى لمواقع التواصل',
        description: 'تصميم واعمال فنيه واداريه',
        price: '5$',
        imgURL: 'src=../../assets/Images/Nerd-amico.png',
        rate: 3,
        catID: 1,
      },
      {
        id: 3,
        freelancerName: 'محمد صلاح',
        freelancerImg: 'src=../../assets/Images/Nerd-amico.png',
        title: 'تصميم كارت شخصي احترافى للطباعه',
        description: 'تصميم بطاقات اعمال',
        price: '5$',
        imgURL: 'src=../../assets/Images/Nerd-amico.png',
        rate: 4,
        catID: 1,
      },

      {
        id: 4,
        freelancerName: 'محمد صلاح',
        freelancerImg: 'src=../../assets/Images/Nerd-amico.png',
        title: 'تركيب لوحه تحكم مجانيه مدى الحياة ',
        description: 'برمجه وتطوير المواقع والتطبيقات',
        price: '25$',
        imgURL: 'src=../../assets/Images/Nerd-amico.png',
        rate: 2,
        catID: 2,
      },
      {
        id: 5,
        freelancerName: 'محمد صلاح',
        freelancerImg: 'src=../../assets/Images/Nerd-amico.png',
        title: 'تصميم موقع تعريفي للشركات',
        description: 'برمجه مواقع الانترنت',
        price: '25$',
        imgURL: 'src=../../assets/Images/Nerd-amico.png',
        rate: 0,
        catID: 3,
      },
    ]),
      (this.category = [
        { id: 1, name: 'خدمات التصميم' },
        { id: 2, name: 'خدمات برمجية' },
        { id: 3, name: 'خدمات الكتابة والترجمة' },
      ]);
    this.filteredJobs = this.jobs;
  }

  filterJobs() {
    if (this.selectedCategoryID == 0) {
      this.filteredJobs = this.jobs;
      console.log(this.selectedCategoryID);
    } else {
      this.filteredJobs = this.jobs.filter(
        (job) => job.catID == this.selectedCategoryID
      );
      // console.log(this.selectedCategoryID)
    }
  }
}
