import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../core/services/auth/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  auth = inject(Auth);
  router = inject(Router);
  isLoading = signal<boolean>(false);
  errormessage = signal<string>('');
  successmessage = signal<string>('');

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  onSubmit() {
    this.errormessage.set('');
    this.successmessage.set('');
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.auth.login(this.loginForm.value).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.successmessage.set('success');
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1000);
        },
        error: (err) => {
          this.isLoading.set(false);

          console.log('Status:', err.status);
          console.log('Error body:', err.error);

          this.errormessage.set(err.error?.message ?? 'Something went wrong. Please try again.');
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
