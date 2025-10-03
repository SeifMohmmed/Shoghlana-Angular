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

    // if (this.freelancerId) {
    //   this.loadFreelancerData();
    // }
    // console.log('Freelancer obj OnInit :');
    // console.log(this.freelancer);
  }

  loadFreelancerData(): void {
    if (this.freelancer === null) {
      this.freelancerService.getById(this.freelancerId).subscribe({
        next: (res) => {
          console.log('Response: ', res);
          if (res.isSuccess) {
            this.freelancer = res.data;
            console.log(this.freelancer);
            this.StringifiedPortfolio = JSON.stringify(
              this.freelancer.portfolio
            );
            this.StringifiedWorkingHistory = JSON.stringify(
              this.freelancer.workingHistory
            );
            // if (this.freelancer?.personalImageBytes) {
            //   this.freelancer.personalImageBytes = this.convertToBase64(
            //     this.freelancer.personalImageBytes
            //   );
            // }
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
