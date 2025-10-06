import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IClient } from '../../Shared/Models/Client/Client';
import { JobStatus } from '../../Shared/Enums/JobStatus/JobStatus';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss',
})
export class ClientProfileComponent implements OnInit, AfterViewInit {
  clientId: number;
  client: IClient;
  jobStatus = JobStatus;
  clientLevel: number;
  emptyClientDescription: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.clientId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    // console.log(this.clientId);

    this.clientService.getById(this.clientId).subscribe({
      next: (res) => {
        console.log(res.data);
        if (res.isSuccess) {
          this.client = res.data;
          console.log(res);
          console.log(this.client);
          console.log(this.client.country);
          this.clientLevel = Math.ceil(this.client.completedJobsCount / 10);
          console.log(this.client.image);

          if (this.client.description) {
            this.emptyClientDescription = false;
          }
          if (this.clientId) {
            console.log('Client Id : ' + this.clientId);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngAfterViewInit(): void {
    const blockHeads = document.querySelectorAll('.block-head');

    blockHeads.forEach((blockHead) => {
      blockHead.addEventListener('client', () => {
        const targetSelector = blockHead.getAttribute('data-target');

        //Check if targetSelector is not null before processing

        if (targetSelector !== null) {
          const targetElement = document.querySelector(targetSelector);
          const chevronIcon = blockHead.querySelector(
            'i.fa-chevron-down, i.fa-chevron-up'
          );

          if (targetElement && chevronIcon) {
            targetElement.classList.toggle('show');
            chevronIcon.classList.toggle('fa-chevron-down');
            chevronIcon.classList.toggle('fa-chevron-up');
          }
        }
      });
    });
  }

  formattedDateTime() {
    return this.datePipe.transform(this.client.registerationTime, 'mediumDate');
  }
}
