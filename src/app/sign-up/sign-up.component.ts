import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  onSubmit() {
    const formData = this.signUpForm.value;
    const userData = {
      fname: formData.firstName,
      lname: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.resetForm();
      },
      error: (err) => {
    
        const errorMessage = err.error.error; // Assuming `err.error` is the string you provided
    
        if (err.status === 500) {
          if (errorMessage.includes('SequelizeUniqueConstraintError')) {
            this.error = 'This user already exists in the system.';
          } else if (errorMessage.includes('SequelizeValidationError')) {
            this.error = 'The provided phone or email is invalid.';
          } else {
            this.error = 'An unexpected error occurred. Please try again later.';
          }
        } else {
          this.error = 'Unable to register a new user at this time. Please try again later.';
        }
      },
    });
    
  }

  resetForm() {
    this.signUpForm.reset(); // Reset the form fields
  }
}
