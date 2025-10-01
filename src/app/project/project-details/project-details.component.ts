import { Component, OnInit } from '@angular/core';
import { IClientJob } from '../../Shared/Models/Client/IClient-Job';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { ProjectService } from '../project.service';
import { IProposal } from '../../Shared/Models/Proposal/Proposal';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
  providers: [DatePipe],
})
export class ProjectDetailsComponent implements OnInit {
  currentId: number = 0;
  clientJob: IClientJob | undefined;
  proposal: IProposal;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private location: Location,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;

    this.projectService.getById(id).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.clientJob = res.data;
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err),
    });
  }

  goBack() {
    this.location.back();
  }

  getFormattedDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy, h:mm a') || date;
  }
}
