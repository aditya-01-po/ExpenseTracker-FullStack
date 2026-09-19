import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth'

@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validator: this.passwordMatchValidator
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.signupForm.get(controlName);
    return (control?.touched || control?.dirty) && control?.hasError(errorName) || false;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value ? null : { passwordMismatch: true };
  }
  
  onSubmit() :void{
    this.errorMessage = null; // Reset error message
    if(this.signupForm.valid){
      const signupData = this.signupForm.value;
      this.authService.register(signupData).subscribe({
        next: () => {
          this.router.navigate(['/transactions']);
        },
        error: (error) => {
          console.error('Error during signup', error);
          this.errorMessage = error.error?.message||'Error during signup. Please try again.';
        }
      });
    }
  }

}