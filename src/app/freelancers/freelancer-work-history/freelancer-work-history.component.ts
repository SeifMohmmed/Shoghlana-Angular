import { Component, OnInit } from '@angular/core';
import { IFreelancer } from '../../Shared/Models/Freelancers/IFreelancer';
import { IJob } from '../../Shared/Models/Job/IJob';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-freelancer-work-history',
  templateUrl: './freelancer-work-history.component.html',
  styleUrl: './freelancer-work-history.component.scss',
})
export class FreelancerWorkHistoryComponent implements OnInit {
  freelancer: IFreelancer;
  workingHistory: IJob[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const workingHistoryData =
      this.activatedRoute.snapshot.queryParamMap.get('workingHistory');

    if (workingHistoryData) {
      this.workingHistory = JSON.parse(workingHistoryData);
      console.log(this.workingHistory[0]);
    }
    this.FormatPostDate();

    this.workingHistory.forEach((job) => {
      job.showFeedback = false;
    });
  }

  FormatPostDate() {
    this.workingHistory.forEach((job) => {
      if (job.postTime) {
        const formatedDate = this.datePipe.transform(
          job?.postTime,
          'dd/mm/yyyy'
        );
        if (formatedDate) {
          job.formattedPostTime = formatedDate;
        }
      }
    });
  }

  toggleFeedback(jobId: Number) {
    const job = this.workingHistory.find((j) => j.id == jobId);
    if (job) {
      job.showFeedback = !job.showFeedback;
    }
  }
}
