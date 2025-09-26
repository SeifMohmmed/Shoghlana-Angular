import { Component } from '@angular/core';
import { IFreelancer } from '../../Shared/Models/Freelancers/IFreelancer';
import { FreelancersService } from '../freelancers.service';

@Component({
  selector: 'app-freelancers',
  templateUrl: './freelancers.component.html',
  styleUrl: './freelancers.component.scss',
})
export class FreelancersComponent {
  FreelancersArr: IFreelancer[];
  constructor(private freelancerService: FreelancersService) {
    this.FreelancersArr = this.freelancerService.getAll();
  }

  getStars(rate: number): Array<number> {
    return Array(5)
      .fill(0)
      .map((x, i) => i);
  }
}
