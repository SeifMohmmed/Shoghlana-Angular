import { Component, OnInit } from '@angular/core';
import { IFreelancer } from '../../Shared/Models/Freelancers/IFreelancer';
import { FreelancersService } from '../freelancers.service';

@Component({
  selector: 'app-freelancers',
  templateUrl: './freelancers.component.html',
  styleUrl: './freelancers.component.scss',
})
export class FreelancersComponent implements OnInit {
  FreelancersArr: IFreelancer[] = [];
  constructor(private freelancerService: FreelancersService) {}

  ngOnInit(): void {
    this.freelancerService.getAll().subscribe({
      next: (res) => {
        console.log(res); // Log the response to verify its structure

        //Ensure the response has the expected structure before mapping
        if (res.isSuccess && Array.isArray(res.data)) {
          this.FreelancersArr = res.data.map((freelancer: IFreelancer) => {
            return {
              ...freelancer,
              personalImageBytes: freelancer.personalImageBytes
                ? `data:image/png;base64,${freelancer.personalImageBytes}`
                : null,
            };
          });
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err),
    });
  }
}
