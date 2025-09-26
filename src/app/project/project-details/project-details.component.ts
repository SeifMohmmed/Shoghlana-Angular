import { Component, OnInit } from '@angular/core';
import { IClientJob } from '../../Shared/Models/Client/IClient-Job';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../client/client.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent implements OnInit {
  currentId: number = 0;
  clientJob: IClientJob[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.currentId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.currentId);
    this.clientJob = this.clientService.getClientJobByCatId(this.currentId);
  }

  goBack() {
    this.location.back();
  }
}
