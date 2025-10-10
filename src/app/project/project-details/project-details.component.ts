import { Component, OnInit } from '@angular/core';
import { IClientJob } from '../../Shared/Models/Client/IClient-Job';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { ProjectService } from '../project.service';
import { IProposal } from '../../Shared/Models/Proposal/Proposal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProposalService } from '../../offers/proposal.service';
import Swal from 'sweetalert2';
import { JobStatus } from '../../Shared/Enums/JobStatus/JobStatus';
import { FreelancersService } from '../../freelancers/freelancers.service';
import { IndividualChatService } from '../../signal-r/individual-chat/individual-chat.service';
import { User } from '../../Shared/Models/User/User';
import { Router } from 'express';

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
  jobStatus = JobStatus;
  proposalId: any;
  proposalDetails: any;
  freelancerId: any;
  freelancerDetails: any[] = [];
  freelancerName: any;
  apiErrorMessage: string[] = [];
  openChat = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private proposalService: ProposalService,
    private freelancerService: FreelancersService,
    private individualChatService: IndividualChatService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id')!;

    this.projectService.getById(id).subscribe({
      next: (res) => {
        console.log('Project response:', res);

        if (res.isSuccess) {
          this.clientJob = res.data;
          this.proposalForm.patchValue({ JobId: id });
        } else {
          console.error('Unexpected response structure:', res);
        }
      },
      error: (err) => console.log(err),
    });
    this.formValidator();

    this.proposalService.getProposalByJobId(id).subscribe({
      next: (res) => {
        console.log('Proposal response:', res);
        this.proposalDetails = res.data;
        console.log('proposal Details: ', this.proposalDetails);

        if (Array.isArray(this.proposalDetails)) {
          this.proposalDetails.forEach((proposal: { freelancerId: any }) => {
            const freelancerId = proposal.freelancerId;
            console.log('freelancerId', freelancerId);

            this.freelancerService.getById(freelancerId).subscribe({
              next: (freelancerRes) => {
                console.log('freelancer data: ', freelancerRes);
                if (freelancerRes && typeof freelancerRes === 'object') {
                  this.freelancerDetails.push(freelancerRes.data);
                  this.freelancerName = freelancerRes.data.name;
                  console.log('name', this.freelancerName);
                } else {
                  console.error(
                    'Unexpected freelancer response format',
                    freelancerRes
                  );
                }
              },
              error: (err) => {
                console.error('Error fetching freelancer data: ', err);
              },
            });
          });
        } else {
          console.error('Unexpected response data format: ', res.data);
        }
      },
      error: (err) => {
        console.error('Error fetching proposal data', err);
      },
    });
    this.individualChatService.myName = { name: 'Intial Name' };
  }

  formValidator() {
    this.proposalForm = this.fb.group({
      Description: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Duration: ['', [Validators.required]],
      JobId: ['', [Validators.required]],
      FreelancerId: ['', [Validators.required]],
    });
  }

  chat() {
    this.apiErrorMessage = [];
    this.openChat = true;
    const user: User = { name: this.freelancerName };
    this.individualChatService.registerUser(user).subscribe({
      next: () => {
        //console.log('openChat');
        this.individualChatService.myName = user;
        console.log('myname', this.individualChatService.myName);
        this.openChat = true;
      },
      error: (err) => {
        if (typeof err.error !== 'object') {
          this.apiErrorMessage.push(err.error);
        }
      },
    });
  }

  closeChat() {
    this.openChat = false;
  }

  goBack() {
    this.location.back();
  }

  addProposal() {
    let formData: FormData;
    formData = new FormData();

    formData.append('Duration', this.proposalForm.get('Duration')?.value);
    formData.append('Description', this.proposalForm.get('Description')?.value);
    formData.append('Price', this.proposalForm.get('Price')?.value);
    formData.append('JobId', this.proposalForm.get('JobId')?.value);
    formData.append(
      'FreelancerId',
      this.proposalForm.get('FreelancerId')?.value
    );

    console.log('Submitting proposal...');
    if (this.proposalForm.valid) {
      // const payload = this.proposalForm.value;
      // console.log('Form is valid:', payload);
      this.proposalService.postProposal(formData).subscribe({
        next: () => {
          Swal.fire({
            //title: 'wow!',
            text: ':) ارسال عرضك بنجاح',
            icon: 'success',
          });
        },
        error: (err) => {
          console.log('Error response:', err);
          console.log('Payload sent:', formData);
          // alert('Failed to submit proposal');
          Swal.fire({
            title: ':( فشل ارسال الطلب',
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
