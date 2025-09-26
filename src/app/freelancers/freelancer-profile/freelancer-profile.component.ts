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
    this.activatedRoute.paramMap.subscribe((params) => {
      this.freelancerId = Number(params.get('id'));
      console.log('ID:', this.freelancerId);

      this.freelancer = this.freelancerService.getById(this.freelancerId);
      console.log(this.freelancer);
    });
  }
}
