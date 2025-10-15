import { Component, OnInit } from '@angular/core';
import { IFreelancer } from '../../Shared/Models/Freelancers/IFreelancer';
import { ActivatedRoute, Router } from '@angular/router';
import { FreelancersService } from '../freelancers.service';
import { ISkill } from '../../Shared/Models/Skill/Skill';
import { SkillsService } from '../../Skills/skills.service';
import { MatDialog } from '@angular/material/dialog';
import { IdentityService } from '../../identity/identity.service';

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
  selectedSkillsIds: number[] = [];
  previewImage: string | ArrayBuffer | null = null;
  skillInput: string;
  loggedInIn: number;
  isFreelancer: boolean = false;
  isClient: boolean = false;
  // StringifiedWorkingHistory: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private freelancerService: FreelancersService,
    private skillService: SkillsService,
    private identityService: IdentityService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.freelancerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadFreelancerData();
    this.loadAllSkills();

    this.identityService.id.subscribe({
      next: () => {
        if (this.identityService.id.getValue() !== null) {
          this.loggedInIn = Number(this.identityService.id.getValue());
          console.log('Id From Navbar ' + this.loggedInIn);
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
      const validExtensions = ['image/png', 'image/jpeg']; // Allowed file types
      const maxSize = 1 * 1024 * 1024; // Maximum size in bytes (1 MB)

      if (!validExtensions.includes(file.type)) {
        alert('الامتدادات المسموح بها : png , jpg and jpeg');
        input.value = ''; // Clear the input
        return;
      }

      if (file.size > maxSize) {
        alert('يجب ألا يتعدى حجم الصورة 1 ميجابايت');
        input.value = ''; // Clear the input
        return;
      }

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
    this.selectedSkillsIds.forEach((skillId) => {
      formData.append('skillIDs', skillId.toString());
    });

    // Make your HTTP request with formData
    this.freelancerService.update(this.freelancerId, formData).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.freelancer = res.data;
          this.loadFreelancerData();
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
      this.selectedSkillsIds.push(skillId);
    } else {
      this.selectedSkillsIds = this.selectedSkillsIds.filter(
        (id) => id !== skillId
      );
    }
  }

  isSkillSelected(skillId: number): boolean {
    return this.selectedSkillsIds.includes(skillId);
  }

  public loadFreelancerData(): void {
    if (this.freelancerId) {
      this.freelancerService.getById(this.freelancerId).subscribe({
        next: (res) => {
          console.log('Response: ', res);
          if (res.isSuccess && res.data != null) {
            this.freelancer = res.data;
            this.originalFreelancer = { ...res.data };
            this.selectedSkillsIds = this.freelancer.skills.map(
              (skill) => skill.id
            );
            console.log('Freelancer', this.freelancer);

            console.log(
              'Image comming from service',
              this.freelancer.personalImageBytes
            );

            const isBase64Image = /^data:image\/(png|jpeg|jpg);base64,/.test(
              res.data.personalImageBytes as string
            );

            if (res.data.personalImageBytes == null || isBase64Image) {
              this.freelancer.personalImageBytes =
                this.originalFreelancer.personalImageBytes =
                  '../../../assets/Images/default-profile-picture-avatar-png-green.png';
            } else {
              this.freelancer.personalImageBytes = `data:image/png;base64,${res.data.personalImageBytes}`;
              this.originalFreelancer.personalImageBytes = `data:image/png;base64,${res.data.personalImageBytes}`;
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

  getImageSource(): string {
    if (this.editMode && this.previewImage) {
      return String(this.previewImage);
    } else if (this.freelancer.personalImageBytes !== null) {
      return String(this.freelancer.personalImageBytes);
    } else {
      return '../../../assets/Images/default-profile-picture-avatar-png-green.png';
    }
  }

  private convertToBase64(bytes: any): string {
    return `data:image/png;base64,${bytes}`;
  }
}
