import { Component, OnInit } from '@angular/core';
import { IFreelancer } from '../../Shared/Models/Freelancers/IFreelancer';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancersService } from '../freelancers.service';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.scss',
})
export class FreelancerProfileComponent implements OnInit {
  freelancer: IFreelancer;
  freelancerId: number;
  StringifiedPortfolio: any;
  StringifiedWorkingHistory: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private freelancerService: FreelancersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.freelancerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadFreelancerData();
  }

  private loadFreelancerData(): void {
    if (this.freelancerId) {
      this.freelancerService.getById(this.freelancerId).subscribe({
        next: (res) => {
          console.log('Response: ', res);
          if (res.isSuccess && res.data != null) {
            this.freelancer = res.data;

            console.log('Freelancer', this.freelancer);

            console.log(
              'Image comming from service',
              this.freelancer.personalImageBytes
            );

            if (res.data.personalImageBytes == null) {
              const imageUrl = res.data.personalImageBytes
                ? `data:image/png;base64,${res.data.personalImageBytes}`
                : '../../../assets/Images/default-profile-picture-avatar-png-green.png';

              console.log('imageUrl');
              console.log(imageUrl);

              this.freelancer.personalImageBytes = imageUrl;
            }
            console.log(
              'Image comming from service',
              this.freelancer.personalImageBytes
            );
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
    this.navigateToPortfolio();
  }

  private convertToBase64(bytes: any): string {
    return `data:image/png;base64,${bytes}`;
  }

  navigateToPortfolio() {
    console.log(this.freelancer.portfolio);
    this.router.navigate(
      [`/freelancerprofile/${this.freelancer.id}/portfolio`],
      { queryParams: { portfolio: this.StringifiedPortfolio } }
    );
  }

  navigateToWorkingHistory() {
    console.log(this.freelancer.workingHistory);
    this.router.navigate(
      [`/freelancerprofile/${this.freelancer.id}/workhistory`],
      { queryParams: { workingHistory: this.StringifiedWorkingHistory } }
    );
  }
}
