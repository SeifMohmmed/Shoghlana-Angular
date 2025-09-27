import { Injectable } from '@angular/core';
import { IClientJob } from '../Shared/Models/Client/IClient-Job';
import { JobStatus } from '../Shared/Enums/JobStatus/JobStatus';

@Injectable({
  providedIn: 'root',
})
export class ClientJobService {
  ClientJob: IClientJob[];
  filteredJobs: IClientJob[];
  selectedCategories: number[] = [];

  constructor() {
    this.ClientJob = [
      {
        id: 1,
        title: 'مطلوب متخصص لعمل اسكربت علي موقع حجز مواعيد تأشيرة',
        MinPrice: '25$',
        MaxPrice: '50$',
        status: JobStatus.Closed,
        clientName: 'منار',
        clientImg: '../../assets/Images/Nerd-amico.png',
        catID: 1,
      },
      {
        id: 2,
        title: ' تعديلات و إعادة تصميم موقع ووردبريس',
        MinPrice: '10$',
        MaxPrice: '30$',
        status: JobStatus.Completed,
        clientName: 'أحمد',
        clientImg: '../../assets/Images/Nerd-amico.png',
        catID: 2,
      },
      {
        id: 3,
        title: 'موقع ومتجر إلكتروني لجمعية خيرية',
        MinPrice: '20$',
        MaxPrice: '40$',
        status: JobStatus.Active,
        clientName: 'سارة',
        clientImg: '../../assets/Images/Nerd-amico.png',
        catID: 3,
      },
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
