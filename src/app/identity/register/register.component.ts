import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IdentityService } from '../identity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;
  apiError: string = '';
  RegisterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValidator();
  }

  formValidator() {
    this.RegisterForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
        ],
      ],
      repeatPassword: ['', [Validators.required]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    });
  }

  handleRegister(registerForm: FormGroup) {
    this.isLoading = true;
    if (registerForm.valid) {
      console.log(registerForm.value);
      this.identityService.register(registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.isSuccess) {
            this.isLoading = false;
            this.router.navigateByUrl('/login');
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.apiError = error.error?.errors ?? 'حدث خطأ غير متوقع';
          alert(this.apiError);
        },
      });
    }
  }
}
