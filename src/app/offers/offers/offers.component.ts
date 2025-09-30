import { Component, OnInit } from '@angular/core';
import { IProposal } from '../../Shared/Models/Proposal/Proposal';
import { Router } from '@angular/router';
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
})
export class OffersComponent implements OnInit {
  proposals: IProposal[] = [];

  constructor(
    private proposalService: ProposalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.proposalService.getAll().subscribe({
      next: (res) => {
        console.log('Res ', res.data);
        if (res.isSuccess && Array.isArray(res.data)) {
          this.proposals = res.data;
        } else {
          console.error('Unexpected Response Structure: ', res);
        }
      },
      error: (err) => console.log(err),
    });
  }
}
