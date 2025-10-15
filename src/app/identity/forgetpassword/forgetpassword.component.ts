import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../identity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent implements OnInit {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
  showEmailSent: boolean = false;
  isSubmitting: boolean = false;

  constructor(
    private identityService: IdentityService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
      console.log('Token from URL:', this.token);
    });
  }

  forgetPassword() {
    this.isSubmitting = true;

    this.identityService.forgetPassword(this.email).subscribe({
      next: (res) => {
        console.log(res.isSuccess);

        Swal.fire(res.message, 'info');
        this.token = res.token;
        console.log('Token is : ', this.token);
        this.showEmailSent = res.isSuccess;
        this.isSubmitting = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log('Resonse from Error: ', error);
        Swal.fire('error!', error.message, 'warning');
        this.showEmailSent = true;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  resetPassword() {
    const resetForm = {
      token: this.token,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    this.isSubmitting = true;

    this.identityService.resetPassword(resetForm).subscribe({
      next: (res) => {
        console.log(res.isSuccess);
        console.log('response from next: ', res);

        this.showEmailSent = res.isSuccess;
        this.isSubmitting = false;

        if (res.isSuccess) {
          Swal.fire('تم تغيير كلمة السر بنجاح');
          this.router.navigateByUrl('/account/login');
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('response from error:', error);
        Swal.fire('حاول مجددا', 'خطا', 'warning');

        this.showEmailSent = true;
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
