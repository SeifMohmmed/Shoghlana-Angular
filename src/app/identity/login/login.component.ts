import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../identity.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  apiError: string = '';
  LoginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValidator();
  }

  formValidator() {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  handleLogin(LoginForm: FormGroup) {
    this.isLoading = true;

    if (LoginForm.valid) {
      console.log(LoginForm.value);

      this.identityService.login(LoginForm.value).subscribe({
        next: (value: any) => {
          console.log('This is response ', value);

          if (value.isSuccess) {
            this.isLoading = false;
            this.router.navigateByUrl('/');
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error?.errors ?? 'حدث خطأ غير متوقع';
          alert(this.apiError);
        },
      });
    }
  }
}
