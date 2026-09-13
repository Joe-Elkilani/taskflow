import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Projects } from '../../../core/services/projects/projects';
import { ProjectData } from '../../../shared/interface/project-data';
import { DatePipe } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-project-details',
  styleUrl: './project-details.css',
  templateUrl: './project-details.html',
})
export class ProjectDetails {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projects = inject(Projects);

  projectId = signal<number>(0);
  project_data = signal<ProjectData | null>(null);

  projectToDelete = signal<ProjectData | null>(null);
  isDeleting = signal<boolean>(false);
  deleteError = signal<string>('');

  constructor() {
    effect(() => {
      if (this.project_data()) {
        setTimeout(() => initFlowbite());
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        const id = res.get('id');
        if (id) {
          this.projectId.set(Number(id));
          this.projects.getProjectById(id).subscribe({
            next: (res) => {
              this.project_data.set(res);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
    });
  }

  openDeleteModal(event: Event, project: ProjectData) {
    event.stopPropagation();
    this.deleteError.set('');
    this.projectToDelete.set(project);
  }

  closeDeleteModal() {
    this.projectToDelete.set(null);
  }

  confirmDelete() {
    const project = this.projectToDelete();
    if (!project) return;

    this.isDeleting.set(true);
    this.projects.deleteProjectById(String(project.id)).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.closeDeleteModal();
        this.router.navigate(['/projects']);
      },
      error: (err) => {
        this.isDeleting.set(false);
        console.log(err);
        this.deleteError.set(err.error?.message ?? 'Could not delete project. Try again.');
      },
    });
  }
}
