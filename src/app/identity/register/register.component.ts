import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IdentityService } from '../identity.service';
import { Router } from '@angular/router';
import { GoogleAuthData } from '../../Shared/Models/GoogleAuth/GoogleAuthData';
import { UserRoleService } from '../user-role.service';
import { SocialAuthService } from 'angularx-social-login';
import Swal from 'sweetalert2';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  isLoading: boolean = false;
  apiError: string = '';
  RegisterForm: FormGroup;
  googleAuthData: GoogleAuthData;
  userRole: number;
  email: string = '';
  showModel2: boolean = false;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private socialAuthService: SocialAuthService,
    private userRoleService: UserRoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValidator();
    this.userRole = this.userRoleService.get();
    this.socialAuthService.authState.subscribe({
      next: (res) => {
        console.log(res);
        console.log('Role Before adding to google obj ' + this.userRole);
        // this.googleAuthData = res
        this.googleAuthData.email = res.email;
        this.googleAuthData.firstName = res.firstName;
        this.googleAuthData.id = res.id;
        this.googleAuthData.idToken = res.idToken;
        this.googleAuthData.name = res.name;
        this.googleAuthData.photoUrl = res.photoUrl;
        //  this.googleAuthData.role = this.UserRole

        console.log('role in google obj google' + this.googleAuthData.role);

        console.log(this.googleAuthData);

        this.identityService
          .googleAuthentication(this.googleAuthData)
          .subscribe({
            next: (res) => {
              console.log(res);
              if (res.isSuccess) {
                localStorage.setItem('UserToken', res.data.idToken);
                localStorage.setItem('Id', res.data.id);
                console.log(localStorage.getItem('Id'));
                this.router.navigateByUrl('/');
              }
            },
            error: (err) => console.log(err),
          });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed');
      },
    });
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
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/
          ),
        ],
      ],
      repeatPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[0-9])(?=.*[#$@!.\-])[A-Za-z\d#$@!.\-]{8,}$/
          ),
        ],
      ],
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
            this.email = registerForm.value.email;
            console.log(this.email);

            Swal.fire({
              text: 'هل تريد تأكيد تسجيل حسابك ؟',
              showCancelButton: true,
              confirmButtonText: 'تأكيد',
              cancelButtonText: 'إلغاء',
              customClass: {
                confirmButton: 'btn-success',
                cancelButton: 'btn-danger',
              },
            }).then((result) => {
              if (result.isConfirmed) {
                this.confirm(); // confirmation clicked
              } else {
                // canceled
              }
            });
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

  confirm() {
    const toemail = this.email;

    console.log(toemail);
    this.identityService.confirmMail(toemail).subscribe({
      next: (res) => {
        console.log(res);
        console.log(res.isSuccess);
        if (res.isSuccess) {
          window.open(
            `https://mail.google.com/mail/u/0/#inbox=${toemail}`,
            '_blank'
          );
          this.router.navigateByUrl('/login');
        }
      },
      error: (err) => {
        alert(`Error sending confirmation email: ${err}`);
      },
    });
  }

  onRoleSelected(role: string) {
    console.log(role);
  }
}
