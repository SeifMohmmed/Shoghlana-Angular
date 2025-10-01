import { Component, OnInit } from '@angular/core';
import { IClientJob } from '../../Shared/Models/Client/IClient-Job';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { ProjectService } from '../project.service';
import { IProposal } from '../../Shared/Models/Proposal/Proposal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProposalService } from '../../offers/proposal.service';

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
  proposalForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private proposalService: ProposalService,
    private fb: FormBuilder,
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

    this.proposalForm = this.fb.group({
      deliveryTime: ['', [Validators.required]],
      offerValue: ['', [Validators.required]],
      offerDetails: ['', [Validators.required]],
    });
  }

  goBack() {
    this.location.back();
  }

  addProposal(proposalForm: FormGroup) {
    if (this.proposalForm?.valid) {
      this.proposalService.postProposal(this.proposal).subscribe({
        next: () => {
          alert('done');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  getFormattedDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy, h:mm a') || date;
  }
}
