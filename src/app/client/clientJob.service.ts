import { Injectable } from '@angular/core';
import { IClientJob } from '../Shared/Models/Client/IClient-Job';

@Injectable({
  providedIn: 'root',
})
export class ClientJobService {
  ClientJob: IClientJob[];
  filteredJobs: IClientJob[];
  selectedCategories: number[] = [];

  constructor() {
    this.ClientJob = [
      // {
      //   id: 1,
      //   title: 'مطلوب متخصص لعمل اسكربت علي موقع حجز مواعيد تأشيرة',
      //   minBudget: '25$',
      //   maxBudget: '50$',
      //   status: '',
      //   description: '',
      //   clientName: 'منار',
      //   clientImg: '../../assets/Images/Nerd-amico.png',
      //   catID: 1,
      //   postTime: '',
      // },
      // {
      //   id: 2,
      //   title: ' تعديلات و إعادة تصميم موقع ووردبريس',
      //   minBudget: '10$',
      //   maxBudget: '30$',
      //   status: '',
      //   clientName: 'أحمد',
      //   clientImg: '../../assets/Images/Nerd-amico.png',
      //   catID: 2,
      //   description: '',
      //   postTime: '',
      // },
      // {
      //   id: 3,
      //   title: 'موقع ومتجر إلكتروني لجمعية خيرية',
      //   minBudget: '20$',
      //   maxBudget: '40$',
      //   status: '',
      //   clientName: 'سارة',
      //   clientImg: '../../assets/Images/Nerd-amico.png',
      //   catID: 3,
      //   description: '',
      //   postTime: '',
      // },
    ];
    this.filteredJobs = [...this.ClientJob];
  }

  getAllClientJobs(): IClientJob[] {
    return this.ClientJob;
  }

  getClientJobById(id: number): IClientJob | null {
    let foundJob = this.ClientJob.find((job) => job.id == id);
    return foundJob ? foundJob : null;
  }

  getClientJobByCatId(catId: number): IClientJob[] {
    return this.ClientJob.filter((job) => job.catID == catId);
  }

  filterProjects(selectedCategories: number[]) {
    this.selectedCategories = selectedCategories;
    if (this.selectedCategories.length > 0) {
      return (this.filteredJobs = this.ClientJob.filter((job) =>
        this.selectedCategories.includes(job.catID)
      ));
    } else {
      return (this.filteredJobs = [...this.ClientJob]);
    }
  }
}
