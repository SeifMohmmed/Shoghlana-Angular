import { Component, OnInit } from '@angular/core';
import { IFreelancer } from '../../Shared/Models/Freelancers/IFreelancer';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancersService } from '../freelancers.service';
import { ISkill } from '../../Shared/Models/Skill/Skill';
import { SkillsService } from '../../Skills/skills.service';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrl: './freelancer-profile.component.scss',
})
export class FreelancerProfileComponent implements OnInit {
  freelancer: IFreelancer;
  freelancerId: number;
  originalFreelancer: IFreelancer;
  editMode: boolean = false;
  allSkills: ISkill[] = [];
  selectedSkills: number[] = [];
  previewImage: string | ArrayBuffer | null = null;
  // StringifiedWorkingHistory: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private freelancerService: FreelancersService,
    private skillService: SkillsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.freelancerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadFreelancerData();
    this.loadAllSkills();
  }

  private loadAllSkills() {
    this.skillService.getAll().subscribe({
      next: (res) => {
        if (res.isSuccess && res.data != null) {
          console.log('Got All Skills');
          this.allSkills = res.data;
        } else {
          console.error('Failed to get Skills, Status Code: ' + res.status);
          console.error('Server Message: ' + res.message);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.originalFreelancer = { ...this.freelancer };
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Assuming this.freelancer.personalImageBytes should be updated with the file data
      this.freelancer.personalImageBytes = file;

      // You may want to display the selected file in your UI
      const reader = new FileReader();
      reader.onload = () => {
        // Example: Display the selected file as a preview
        this.previewImage = reader.result as string; // Assuming previewImage is bound to an <img> tag in your HTML
      };
      reader.readAsDataURL(file);
    }
  }

  // Method to save changes including file upload
  saveChanges(): void {
    const formData = new FormData();

    // Append personal image if it's selected
    if (this.freelancer.personalImageBytes instanceof File) {
      formData.append('personalImageBytes', this.freelancer.personalImageBytes);
    }

    // Append other fields
    formData.append('name', this.freelancer.name ?? '');
    formData.append('title', this.freelancer.title ?? '');
    formData.append('overview', this.freelancer.overView ?? '');
    formData.append('address', this.freelancer.address ?? '');
    // Append other fields as needed

    // Append skillIDs as array of integers
    this.selectedSkills.forEach((skillId) => {
      formData.append('skillIDs', skillId.toString());
    });

    // Make your HTTP request with formData
    this.freelancerService.update(this.freelancerId, formData).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.freelancer = res.data;
          this.editMode = false;
        } else {
          console.error(
            `Failed to update the profile, Status Code: ${res.status}`
          );
          console.error(`Server Message: ${res.message}`);
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  cancelEdit() {
    this.freelancer = { ...this.originalFreelancer }; // Revert to the original data
    this.previewImage = null; // Clear the preview image
    this.editMode = false;
  }

  onSkillChange(event: Event, skillId: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedSkills.push(skillId);
    } else {
      this.selectedSkills = this.selectedSkills.filter((id) => id !== skillId);
    }
  }

  isSkillSelected(skillId: number): boolean {
    return this.selectedSkills.includes(skillId);
  }

  private loadFreelancerData(): void {
    if (this.freelancerId) {
      this.freelancerService.getById(this.freelancerId).subscribe({
        next: (res) => {
          console.log('Response: ', res);
          if (res.isSuccess && res.data != null) {
            this.freelancer = res.data;
            this.originalFreelancer = { ...res.data };
            this.selectedSkills = this.freelancer.skills.map(
              (skill) => skill.id
            );
            console.log('Freelancer', this.freelancer);

            console.log(
              'Image comming from service',
              this.freelancer.personalImageBytes
            );

            if (res.data.personalImageBytes == null) {
              const imageUrl = res.data.personalImageBytes
                ? `data:image/png;base64,${res.data.personalImageBytes}`
                : '../../../assets/Images/default-profile-picture-avatar-png-green.png';

              console.log('imageUrl');
              console.log(imageUrl);

              this.freelancer.personalImageBytes = imageUrl;
            }
            console.log(
              'Image comming from service',
              this.freelancer.personalImageBytes
            );
          } else {
            console.error(`Failed to get the data, Status Code: ${res.status}`);
            console.error(`Server Message: ${res.message}`);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
    //this.navigateToPortfolio();
  }

  private convertToBase64(bytes: any): string {
    return `data:image/png;base64,${bytes}`;
  }

  // navigateToPortfolio() {
  //   console.log(this.freelancer.portfolio);
  //   this.router.navigate(
  //     [`/freelancerprofile/${this.freelancer.id}/portfolio`],
  //     { queryParams: { portfolio: this.originalFreelancer } }
  //   );
  // }

  // navigateToWorkingHistory() {
  //   console.log(this.freelancer.workingHistory);
  //   this.router.navigate(
  //     [`/freelancerprofile/${this.freelancer.id}/workhistory`],
  //     { queryParams: { workingHistory: this.StringifiedWorkingHistory } }
  //   );
  // }
}
