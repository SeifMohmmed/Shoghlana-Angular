import { Component, OnInit } from '@angular/core';
import { IFreelancer } from '../../Shared/Models/Freelancers/IFreelancer';
import { ActivatedRoute } from '@angular/router';
import { FreelancersService } from '../freelancers.service';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.scss',
})
export class FreelancerProfileComponent implements OnInit {
  freelancer: IFreelancer | undefined;
  freelancerId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private freelancerService: FreelancersService
  ) {}

  ngOnInit(): void {
    if (this.freelancerId) {
      this.loadFreelancerData();
    }
    console.log('Freelancer obj OnInit :');
    console.log(this.freelancer);
  }

  loadFreelancerData(): void {
    if (!this.freelancer) {
      this.freelancerService.getById(this.freelancerId).subscribe({
        next: (res) => {
          console.log('Response: ', res);
          if (res.isSuccess) {
            this.freelancer = res.data;
            if (this.freelancer?.personalImageBytes) {
              this.freelancer.personalImageBytes = this.convertToBase64(
                this.freelancer.personalImageBytes
              );
            }
          } else {
            console.error(`Failed to get the data, Status Code: ${res.status}`);
            console.error(`Server Message: ${res.message}`);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  private convertToBase64(bytes: any): string {
    return `data:image/png;base64,${bytes}`;
  }
}
