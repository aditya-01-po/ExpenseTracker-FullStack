import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
   loginForm: FormGroup;
   errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  

  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (control?.touched || control?.dirty) && control?.hasError(errorName) || false;
  }

  
  onSubmit() :void{
    this.errorMessage = null; // Reset error message
    if(this.loginForm.valid){
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: () => {
          this.router.navigate(['/transactions']);
        },
        error: (error) => {
          console.error('Error during login', error);
          this.errorMessage = error.error?.message||'Error during login. Please try again.';
        }
      });
    }
  }

}
