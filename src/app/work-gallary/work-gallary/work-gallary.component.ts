import { Component, OnInit } from '@angular/core';
import { IProject } from '../../Shared/Models/Project/Project';
import { ProjectService } from '../../project/project.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-work-gallary',
  templateUrl: './work-gallary.component.html',
  styleUrl: './work-gallary.component.scss',
})
export class WorkGallaryComponent implements OnInit {
  loggedInId: number;
  projects: IProject[];
  filteredProjects: IProject[] = [];
  projectName = '';

  constructor(
    private projectService: ProjectService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('Id')) {
      this.loggedInId = Number(localStorage.getItem('Id'));
    }

    this.projectService.getByFreelancerId(this.loggedInId).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.projects = res.data;
          this.filteredProjects = this.projects;
        } else {
          console.log(res.message);
        }
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  formatTime(time: any): string {
    return this.datePipe.transform(time, 'mediumDate') ?? '';
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter((p) =>
      p.title.includes(this.projectName)
    );
  }
}
