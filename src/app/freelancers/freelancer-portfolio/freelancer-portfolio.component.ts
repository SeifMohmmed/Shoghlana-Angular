import { Component, OnInit } from '@angular/core';
import { IFreelancer } from '../../Shared/Models/Freelancers/IFreelancer';
import { IProject } from '../../Shared/Models/Project/Project';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../project/project.service';

@Component({
  selector: 'app-freelancer-portfolio',
  templateUrl: './freelancer-portfolio.component.html',
  styleUrl: './freelancer-portfolio.component.scss',
})
export class FreelancerPortfolioComponent implements OnInit {
  freelancer: IFreelancer;
  portfolio: IProject[];
  freelancerId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    const portfolioData =
      this.activatedRoute.snapshot.queryParamMap.get('portfolio');

    console.log(portfolioData);

    if (portfolioData) {
      this.portfolio = JSON.parse(portfolioData);
    }
    console.log(this.portfolio[0]);

    this.portfolio.forEach((project) => {
      project.showSkills = false;
    });
  }

  private convertToBase64(bytes: any): string {
    return `data:image/png;base64,${bytes}`;
  }

  toggleProjectSkills(projectId: number) {
    const project = this.portfolio.find((p) => p.id == projectId);

    if (project) {
      project.showSkills = project.showSkills;
    }
  }
}
