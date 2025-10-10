import { Component, OnInit } from '@angular/core';
import { IProposal } from '../../Shared/Models/Proposal/Proposal';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService } from '../proposal.service';
import { ProposalStatus } from '../../Shared/Enums/ProposalStatus/ProposalStatus';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
})
export class OffersComponent implements OnInit {
  proposals: IProposal[] = [] as IProposal[];
  FilteredProposals: IProposal[] = [] as IProposal[];
  ProposalStatus = ProposalStatus;
  ClientName: string = '';
  JobTitle: string = '';

  Approved: ProposalStatus = ProposalStatus.Approved;
  Rejected: ProposalStatus = ProposalStatus.Rejected;
  Waiting: ProposalStatus = ProposalStatus.Waiting;
  All: ProposalStatus = ProposalStatus.All;

  constructor(
    private proposalService: ProposalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(localStorage.getItem('Id'));

    this.proposalService.getProposalByFreelancerId(id).subscribe({
      next: (res) => {
        console.log('Res ', res.data);
        if (res.isSuccess && Array.isArray(res.data)) {
          this.proposals = res.data;
          this.FilteredProposals = this.proposals;
        } else {
          console.error('Unexpected Response Structure: ', res);
        }
      },
      error: (err) => console.log(err),
    });
  }

  FilterProposals(status: ProposalStatus) {
    switch (status) {
      case this.Approved:
        {
          this.FilteredProposals = this.proposals.filter(
            (p) => p.status === this.Approved
          );
        }
        break;
      case this.Waiting:
        {
          this.FilteredProposals = this.proposals.filter(
            (p) => p.status === this.Waiting
          );
        }
        break;
      case this.Rejected:
        {
          this.FilteredProposals = this.proposals.filter(
            (p) => p.status === this.Rejected
          );
        }
        break;

      case this.All:
        this.FilteredProposals = this.proposals;
    }
  }
  FilterByClientName() {
    this.FilteredProposals = this.proposals.filter((p) =>
      p.clientName?.includes(`${this.ClientName}`)
    );
  }

  FilterByJobTitle() {
    this.FilteredProposals = this.proposals.filter((p) =>
      p.jobTitle?.includes(`${this.JobTitle}`)
    );
  }
}
