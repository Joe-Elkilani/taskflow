import { Component, inject, signal } from '@angular/core';
import { Projects } from '../../../core/services/projects/projects';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  imports: [],
  selector: 'app-project-form',
  styleUrl: './project-form.css',
  templateUrl: './project-form.html',
})
export class ProjectForm {
  // projects = inject(Projects);
  // router = inject(Router);
  // isLoading = signal<boolean>(false);
  // errormessage = signal<string>('');
  // successmessage = signal<string>('');
  // project: FormGroup = new FormGroup({
  //   fullName: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //     Validators.maxLength(50),
  //   ]),
  // });
  // onSubmit() {
  //   this.errormessage.set('');
  //   this.successmessage.set('');
  //   if (this.project.valid) {
  //     this.isLoading.set(true);
  //     this.projects.newProject(this.project.value).subscribe({
  //       next: (res) => {
  //         this.isLoading.set(false);
  //         this.successmessage.set('success');
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         console.log('Status:', err.status);
  //         console.log('Error body:', err.error);
  //         this.errormessage.set(err.error?.message ?? 'Something went wrong. Please try again.');
  //       },
  //     });
  //   }
  // }
}
