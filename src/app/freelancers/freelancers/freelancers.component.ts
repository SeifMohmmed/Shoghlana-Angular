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
    this.loadFreelancers();
  }

  loadFreelancers() {
    this.freelancerService.getAll().subscribe({
      next: (res) => {
        console.log(res); // Log the response to verify its structure

        //Ensure the response has the expected structure before mapping
        if (res.isSuccess && Array.isArray(res.data)) {
          this.FreelancersArr = res.data;
          this.FreelancersArr.forEach((freelancer) => {
            if (
              freelancer.personalImageBytes == null ||
              freelancer.personalImageBytes ==
                'data:image/png;base64,${freelancer.personalImageBytes}'
            ) {
              freelancer.personalImageBytes =
                '../../../assets/Images/default-profile-picture-avatar-png-green.png';
            }
          });
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err),
    });
  }
}
