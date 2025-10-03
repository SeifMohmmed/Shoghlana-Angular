import { Component, OnInit } from '@angular/core';
import { IClientJob } from '../../Shared/Models/Client/IClient-Job';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { ProjectService } from '../project.service';
import { IProposal } from '../../Shared/Models/Proposal/Proposal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProposalService } from '../../offers/proposal.service';
import Swal from 'sweetalert2';

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
      Description: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Duration: ['', [Validators.required]],
    });
  }

  goBack() {
    this.location.back();
  }

  addProposal() {
    console.log('Submitting proposal...');
    if (this.proposalForm.valid) {
      const payload = this.proposalForm.value;
      console.log('Form is valid:', payload);
      this.proposalService.postProposal(payload).subscribe({
        next: () => {
          Swal.fire({
            title: 'wow!',
            text: 'تم ارسال طلبك بنجاح',
            icon: 'success',
          });
        },
        error: (err) => {
          console.log('Error response:', err);
          console.log('Payload sent:', payload);
          // alert('Failed to submit proposal');
          Swal.fire({
            title: 'فشل ارسال الطلب',
            icon: 'error',
            confirmButtonText: 'حسناً',
            confirmButtonColor: '#d33', // red button
          });
        },
      });
    } else {
      console.log('Form is Invalid');
    }
  }

  getFormattedDate(date: string): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy, h:mm a') || date;
  }
}
