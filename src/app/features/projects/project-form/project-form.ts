import { Flowbite } from './../../../core/services/flowbite/flowbite';
import { Component, computed, inject, signal } from '@angular/core';
import { Projects } from '../../../core/services/projects/projects';
import { ActivatedRoute, Router } from '@angular/router';
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
  private flowbite = inject(Flowbite);
  private activatedRoute = inject(ActivatedRoute);

  isLoading = signal<boolean>(false);
  errormessage = signal<string>('');
  successmessage = signal<string>('');

  projectId = signal<string | null>(null);
  isEditMode = computed(() => this.projectId() !== null);

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
    progress: new FormControl(0),
  });

  ngOnInit(): void {
    this.flowbite.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.projectId.set(id);
      this.isLoading.set(true);
      this.projects.getProjectById(id).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.projectForm.patchValue({
            name: res.name,
            description: res.description,
            progress: res.progress,
          });
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errormessage.set('Could not load project data.');
        },
      });
    }
  }

  onSubmit() {
    this.errormessage.set('');
    this.successmessage.set('');
    if (this.projectForm.invalid) return;

    this.isLoading.set(true);

    const request$ = this.isEditMode()
      ? this.projects.putProjectBYId(this.projectId()!, this.projectForm.value)
      : this.projects.newProject(this.projectForm.value);

    request$.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successmessage.set(
          this.isEditMode() ? 'Project updated successfully!' : 'Project created successfully!',
        );
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
