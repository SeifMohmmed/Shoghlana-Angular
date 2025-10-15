import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IClient } from '../../Shared/Models/Client/Client';
import { JobStatus } from '../../Shared/Enums/JobStatus/JobStatus';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ClientService } from '../client.service';
import { IdentityService } from '../../identity/identity.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss',
})
export class ClientProfileComponent implements OnInit, AfterViewInit {
  clientId: number;
  client: IClient = {} as IClient;
  jobStatus = JobStatus;
  clientLevel: number;
  emptyClientDescription: boolean = true;
  emptyClientCountry: boolean = true;
  vistitedClientId: number;
  loggedIn: number;
  isFreelancer: boolean = false;
  isClient: boolean = false;
  updatedClient: IClient = {} as IClient;
  @ViewChild('fileInput') fileInput: ElementRef;
  imageError: string | undefined;
  isEditing = false;
  tempDescription: string;
  isEditingName = false;
  tempName: string;
  emptyClientName: boolean = true;
  nameError: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private identityService: IdentityService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.identityService.id.subscribe({
      next: () => {
        if (this.identityService.id.getValue() !== null) {
          this.loggedIn = Number(this.identityService.id.getValue());
          console.log('Id From Navbar ' + this.loggedIn);
        }
      },
    });

    this.identityService.isClient.subscribe({
      next: () => {
        if (this.identityService.isClient.getValue() !== null) {
          this.isClient = true;
          console.log(this.identityService.isClient.getValue());
        } else {
          this.isClient = false;
          console.log(this.identityService.isClient.getValue());
        }
      },
    });

    this.identityService.isFreelancer.subscribe({
      next: () => {
        if (this.identityService.isFreelancer.getValue() !== null) {
          this.isFreelancer = true;
          console.log(this.identityService.isFreelancer.getValue());
        } else {
          this.isFreelancer = false;
          console.log(this.identityService.isFreelancer.getValue());
        }
      },
    });

    this.vistitedClientId = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
    this.loggedIn = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log('Id From Local Stroage: ', this.loggedIn);

    this.updatedClient.id = Number(this.loggedIn);

    console.log('LoggedIn Client Id ' + this.loggedIn);
    console.log('Visited Client Id ' + this.vistitedClientId);

    // console.log(this.clientId);

    this.clientService.getById(this.vistitedClientId).subscribe({
      next: (res) => {
        console.log(res.data);
        if (res.isSuccess) {
          this.client = res.data;
          console.log(res);
          console.log(this.client);
          console.log(this.client.image);
          console.log(this.client.country);
          this.clientLevel = Math.ceil(this.client.completedJobsCount / 10);

          this.updatedClient.name = this.client.name;
          this.updatedClient.description = this.client.description;
          this.updatedClient.country = this.client.country;
          this.updatedClient.image = this.client.image;

          if (this.client.description) {
            this.emptyClientDescription = false;
          }
          if (this.vistitedClientId) {
            console.log('Client Id : ' + this.vistitedClientId);
          }
          if (this.client.country) {
            this.emptyClientCountry = false;
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

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveDescription() {
    this.isEditing = false;
    this.emptyClientDescription = !this.client.description;
    this.updatedClient.description = this.tempDescription;

    this.clientService.update(this.updatedClient).subscribe({
      next: (res) => {
        console.log(res);
        if (res.isSuccess) {
          console.log(res);
          this.client = res.data;
        } else {
          console.log(res);
        }
      },
    });
  }

  cancelEdit() {
    this.isEditing = false;
  }

  toggleEditName() {
    this.isEditingName = !this.isEditingName;
    this.nameError = '';
  }

  saveName() {
    if (this.tempName.trim() === '') {
      this.nameError = 'يجب ادخال الاسم';
      return;
    }
    this.isEditingName = false;
    this.updatedClient.name = this.tempName;
    this.emptyClientName = !this.client.name;
    this.clientService.update(this.updatedClient).subscribe({
      next: (res) => {
        console.log(res);
        if (res.isSuccess) {
          console.log(res);
          this.client = res.data;
        } else {
          console.log(res);
        }
      },
    });
  }

  cancelEditName() {
    this.isEditingName = false;
    this.nameError = '';
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  selectedImgChanged(event: any) {
    const input = event.target as HTMLInputElement;
    const img = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(img.name)) {
      this.imageError = '(Jpg , Png, Jpeg) يرجي استخدام ملف';
      input.value = '';
      return;
    }

    console.log(img);
    this.updatedClient.image = img;
    console.log('sent client : ', this.client);
    this.clientService.update(this.updatedClient).subscribe({
      next: (res) => {
        console.log(res);
        if (res.isSuccess) {
          console.log(res);
          this.client = res.data;
          this.tempDescription = this.client.description;
          console.log(this.client);
          this.imageError = '';
        } else {
          console.log(res);
          console.log(res.data.value.data);
          this.client = res.data.value.data;
          this.imageError = res.message;
          //  alert(res.message)
        }

        //     this.ClientService.GetById(this.VisitedClientId).subscribe({
        //       next : (res) => {this.Client = res.data}
        //     })
      },
    });
  }
  SelectedImgChanged(event: any) {
    const input = event.target as HTMLInputElement;
    const img = event.target.files[0];

    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(img.name)) {
      this.imageError = '(Jpg , Png, Jpeg) يرجي استخدام ملف';
      input.value = '';
      return;
    }
    console.log(img);
    this.updatedClient.image = img;
    console.log('sent client : ', this.client);
    this.clientService.update(this.updatedClient).subscribe({
      next: (res) => {
        console.log(res);
        if (res.isSuccess) {
          console.log(res);
          this.client = res.data;
          this.tempDescription = this.client.description;
          console.log(this.client);
          this.imageError = '';
        } else {
          console.log(res);
          console.log(res.data.value.data);
          this.client = res.data.value.data;
          this.imageError = res.message;
          //  alert(res.message)
        }

        //     this.ClientService.GetById(this.VisitedClientId).subscribe({
        //       next : (res) => {this.Client = res.data}
        //     })
      },
    });
  }

  TriggerFileInput() {
    this.fileInput.nativeElement.click();
  }
}
