import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Auth } from '../../../core/services/auth/auth';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  auth = inject(Auth);
  router = inject(Router);
  isLoading = signal<boolean>(false);
  errormessage = signal<string>('');
  successmessage = signal<string>('');

  registerForm: FormGroup = new FormGroup(
    {
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      terms: new FormControl(false, [Validators.requiredTrue]),
    },
    { validators: this.passwordsMatchValidator },
  );
  onSubmit() {
    this.errormessage.set('');
    this.successmessage.set('');
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.successmessage.set('success');
          setTimeout(() => {
            this.router.navigate(['/login']);
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
      this.registerForm.markAllAsTouched();
    }
  }
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
