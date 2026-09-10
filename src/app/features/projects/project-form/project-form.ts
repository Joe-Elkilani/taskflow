import { Flowbite } from './../../../core/services/flowbite/flowbite';
import { Component, inject, signal } from '@angular/core';
import { Projects } from '../../../core/services/projects/projects';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-project-form',
  styleUrl: './project-form.css',
  templateUrl: './project-form.html',
})
export class ProjectForm {
  projects = inject(Projects);
  router = inject(Router);
  isLoading = signal<boolean>(false);
  errormessage = signal<string>('');
  successmessage = signal<string>('');
  private flowbite = inject(Flowbite);
  ngOnInit(): void {
    this.flowbite.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
  projectForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(1000),
    ]),
    progress: new FormControl(25),
  });
  onSubmit() {
    this.errormessage.set('');
    this.successmessage.set('');
    if (this.projectForm.valid) {
      this.isLoading.set(true);
      this.projects.newProject(this.projectForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.successmessage.set('success');
          console.log(res);
          setTimeout(() => {
            this.router.navigate(['/projects']);
          }, 1000);
        },
        error: (err) => {
          this.isLoading.set(false);
          console.log('Status:', err.status);
          console.log('Error body:', err.error);
          this.errormessage.set(err.error?.message ?? 'Something went wrong. Please try again.');
        },
      });
    }
  }
}
