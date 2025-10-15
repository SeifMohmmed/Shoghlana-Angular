import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../identity.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserRoleService } from '../user-role.service';

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
    private userRoleService: UserRoleService,
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
        next: (response: any) => {
          console.log('This is response ', response);

          if (response.isSuccess) {
            this.isLoading = false;
            // if user tried to navigate to signin via url >> allowed >>
            //  if try to login using another account while he is already logged in >>
            // make logout first to avoid conflicts
            this.identityService.logOut();

            localStorage.setItem('token', response.token);
            localStorage.setItem('Id', response.data.id);

            if (localStorage.getItem('Id')) {
              const id: any = Number(localStorage.getItem('Id'));
              this.identityService.id.next(id);
            }
            localStorage.setItem('Role', response.data.role);

            if (localStorage.getItem('Role') === 'Client') {
              const role: any = 'Client';
              this.identityService.isClient.next(role);
            } else if (localStorage.getItem('Role') === 'Freelancer') {
              const role: any = 'Freelancer';
              this.identityService.isFreelancer.next(role);
            }

            this.identityService.decodeUserData();
            this.identityService.userData.next(response.data); // navbar keep track for changes
            this.isLoading = false;
            this.router.navigateByUrl('/');
            this.userRoleService.set(null);
          } else {
            this.isLoading = false;
            this.apiError = response.message;
            this.resetForm();
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.apiError = err.error?.errors ?? 'حدث خطأ غير متوقع';
          this.resetForm();
          // alert(this.apiError);
        },
      });
    }
  }
  resetForm() {
    this.LoginForm.reset();
    this.apiError = '';
  }
}
