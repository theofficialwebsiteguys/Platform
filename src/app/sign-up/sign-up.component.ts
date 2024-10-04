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
    // if (this.signUpForm.valid) {
    //   this.authService.signUp(this.signUpForm.value).subscribe(
    //     (response) => {
    //       console.log('Signup successful', response);
    //       this.router.navigate(['/login']); // Navigate to login or another page after signup
    //     },
    //     (error) => {
    //       console.error('Signup failed', error);
    //     }
    //   );
    // }
  }
}
