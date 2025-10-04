import { Component, OnInit } from '@angular/core';
import { IFreelancer } from '../../Shared/Models/Freelancers/IFreelancer';
import { IJob } from '../../Shared/Models/Job/IJob';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { JobService } from '../../job/job.service';

@Component({
  selector: 'app-freelancer-work-history',
  templateUrl: './freelancer-work-history.component.html',
  styleUrl: './freelancer-work-history.component.scss',
})
export class FreelancerWorkHistoryComponent implements OnInit {
  freelancer: IFreelancer;
  workingHistory: IJob[];
  freelancerId: number;

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent?.paramMap.subscribe((params) => {
      this.freelancerId = Number(params.get('id'));

      if (this.freelancerId != null) {
        console.log('Success getting the parent ID');
        console.log(this.freelancerId);
      }
    });

    //------------------------------------------------

    this.jobService.getByFreelancerId(this.freelancerId).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          console.log('Getting freelancer history Successfully :D');

          console.log(res.data);

          this.workingHistory = Array.isArray(res.data) ? res.data : [res.data];

          this.workingHistory?.forEach((job) => {
            job.poster = '../../../assets/Images/default-project.png';
          });

          console.log('Jobs after :');
          console.log(this.workingHistory);
        }
      },
      error: (err) => {
        console.error('Error Fetching the freelancer Projects');
      },
    });

    // const workingHistoryData =
    //   this.activatedRoute.snapshot.queryParamMap.get('workingHistory');

    // if (workingHistoryData) {
    //   this.workingHistory = JSON.parse(workingHistoryData);
    //   console.log(this.workingHistory[0]);
    // }
    // this.FormatPostDate();

    // this.workingHistory.forEach((job) => {
    //   job.showFeedback = false;
    // });
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
