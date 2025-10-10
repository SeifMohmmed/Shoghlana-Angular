import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { SocialAuthService } from '@abacritt/angularx-social-login';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  apiError: string | undefined = '';
  RegisterForm: FormGroup;
  googleAuthData: GoogleAuthData | null;
  userRole: number;
  email: string = '';
  showModel2: boolean = false;
  private authStateSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private socialAuthService: SocialAuthService,
    private userRoleService: UserRoleService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.formValidator();

    this.userRole = this.userRoleService.get();
    // console.log(this.UserRole)
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('hello from external auth func');
    this.authStateSubscription = this.socialAuthService.authState.subscribe({
      next: (result) => {
        console.log(result);
        console.log('role before adding to google obj' + this.userRole);
        // this.googleAuthData = result
        if (this.googleAuthData) {
          this.googleAuthData.email = result.email;
          this.googleAuthData.firstName = result.firstName;
          this.googleAuthData.id = result.id;
          this.googleAuthData.idToken = result.idToken;
          this.googleAuthData.name = result.name;
          this.googleAuthData.photoUrl = result.photoUrl;
          //  this.googleAuthData.role = this.UserRole

          console.log('role in google obj google' + this.googleAuthData.role);

          console.log(this.googleAuthData);

          this.identityService
            .googleAuthentication(this.googleAuthData)
            .subscribe({
              next: (res) => {
                console.log(res);
                if (res.isSuccess) {
                  localStorage.setItem('token', res.data.idToken);
                  console.log('client id from backend' + res.data.id);
                  localStorage.setItem('Id', res.data.id);
                  localStorage.setItem('Role', res.data.role.toString());
                  this.identityService.userData.next(res.data);
                  console.log(this.identityService.userData); // here
                  console.log(localStorage.getItem('Id'));
                  this.router.navigateByUrl('/home');
                }
                this.clearAuthState();
              },
              error: (err) => {
                console.log(err);
                this.clearAuthState();
              },
              complete: () => {
                this.clearAuthState();
              },
            });
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }

  ngOnDestroy(): void {
    this.clearAuthState();
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
      role: new FormControl(this.userRoleService.get()),
      // phoneNumbers:new FormArray([new FormControl('')])
    });
    const lang = localStorage.getItem('language') || 'en';
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
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
          } else {
            this.isLoading = false;
            this.apiError = response.message;
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

  private clearAuthState(): void {
    this.googleAuthData = null;
    // Unsubscribe from the authState observable
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }
}
