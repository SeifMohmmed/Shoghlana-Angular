import { Component, OnInit } from '@angular/core';
import { AddProjectService } from '../add-project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddProject } from '../../Shared/Models/Project/IAddProject';
import Swal from 'sweetalert2';
import { SkillsService } from '../../Skills/skills.service';
import { ISkill } from '../../Shared/Models/Skill/Skill';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.scss',
})
export class AddprojectComponent implements OnInit {
  newProject: IAddProject = {} as IAddProject;
  projectForm: FormGroup;
  skillsList: ISkill[] = [];

  constructor(
    private addprojectService: AddProjectService,
    private fb: FormBuilder,
    private skillService: SkillsService
  ) {}

  ngOnInit(): void {
    this.skillService.getAll().subscribe({
      next: (res) => {
        this.skillsList = res.data;
        console.log(this.skillsList);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.formValidator();
  }

  formValidator() {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      minBudget: ['', [Validators.required]],
      maxBudget: ['', [Validators.required]],
      durationInDays: ['', [Validators.required]],
    });
  }

  addProject() {
    let formData: FormData;
    formData = new FormData();

    formData.append('title', this.projectForm.get('title')?.value);
    formData.append('description', this.projectForm.get('description')?.value);
    formData.append('minBudget', this.projectForm.get('minBudget')?.value);
    formData.append('maxBudget', this.projectForm.get('maxBudget')?.value);
    formData.append(
      'durationInDays',
      this.projectForm.get('durationInDays')?.value
    );

    console.log('Submitting Proposal...');
    if (this.projectForm.valid) {
      this.addprojectService.addProject(formData).subscribe({
        next: (res) => {
          console.log(res);
          Swal.fire({
            title: ':) تم ارسال عرضك بنجاح',
            icon: 'success',
            confirmButtonText: 'حسناً',
          });
        },
        error: (err) => {
          console.log('Error response: ', err);
          console.log('Payload send: ', formData);
          Swal.fire({
            title: ' :( فشل ارسال العرض ',
            icon: 'error',
            text: 'Something went wrong!',
          });
        },
      });
    } else {
      console.log('Form is Invalid');
    }
  }
}
