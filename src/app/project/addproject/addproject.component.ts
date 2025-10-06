import { Component, OnInit } from '@angular/core';
import { AddProjectService } from '../add-project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddProject } from '../../Shared/Models/Project/IAddProject';
import Swal from 'sweetalert2';
import { SkillsService } from '../../Skills/skills.service';
import { ISkill } from '../../Shared/Models/Skill/Skill';
import { ICategory } from '../../Shared/Models/Category/ICategory';
import { ExperienceLevel } from '../../Shared/Enums/ExperienceLevel/ExperienceLevel';
import { CategoryService } from '../../Shared/Services/category.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrl: './addproject.component.scss',
})
export class AddprojectComponent implements OnInit {
  newProject: IAddProject = {} as IAddProject;
  projectForm: FormGroup;
  skillsIds: ISkill[] = [];
  categories: ICategory[] = [];
  beginner: ExperienceLevel = ExperienceLevel.Beginner;
  intermediate: ExperienceLevel = ExperienceLevel.Intermediate;
  expert: ExperienceLevel = ExperienceLevel.Expert;

  constructor(
    private addprojectService: AddProjectService,
    private fb: FormBuilder,
    private skillService: SkillsService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.skillService.getAll().subscribe({
      next: (res) => {
        this.skillsIds = res.data;
        console.log(this.skillsIds);
      },
    });

    this.formValidator();
  }

  formValidator() {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      minBudget: ['', [Validators.required, Validators.min(1)]],
      maxBudget: ['', [Validators.required, Validators.min(2)]],
      durationInDays: ['', [Validators.required, Validators.min(1)]],
      skillsIds: [],
      categoryId: ['', [Validators.required]],
      experienceLevel: [null, [Validators.required]],
      clientId: [localStorage.getItem('Id')],
    });
  }

  addProject() {
    // let formData: FormData;
    // formData = new FormData();

    // formData.append('title', this.projectForm.get('title')?.value);
    // formData.append('description', this.projectForm.get('description')?.value);
    // formData.append('minBudget', this.projectForm.get('minBudget')?.value);
    // formData.append('maxBudget', this.projectForm.get('maxBudget')?.value);
    // formData.append(
    //   'durationInDays',
    //   this.projectForm.get('durationInDays')?.value
    // );

    console.log('Submitting Proposal...');
    if (this.projectForm.valid) {
      this.addprojectService.addProject(this.projectForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.isSuccess) {
            Swal.fire({
              title: ':) تم ارسال عرضك بنجاح',
              icon: 'success',
              confirmButtonText: 'حسناً',
            });
          } else {
            Swal.fire({
              title: ' :( فشل ارسال العرض ',
              icon: 'error',
              text: 'Something went wrong!',
            });
          }
        },
        error: (err) => {
          console.log('Error response: ', err);
          // console.log('Payload send: ', formData);
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
