import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formValidator();
  }

  formValidator() {
    this.RegisterForm = this.fb.group({
      name: [
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
      rePassword: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
    });
  }

  handleRegister(RegisterForm: FormGroup) {
    console.log(RegisterForm);
  }
}
