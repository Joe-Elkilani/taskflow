import { Component, effect, inject, signal } from '@angular/core';
import { Projects } from '../../../core/services/projects/projects';
import { Project } from '../../../shared/interface/project/project';
import { Flowbite } from '../../../core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterLink, SearchPipe, FormsModule],
  selector: 'app-project-list',
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList {
  private readonly projects = inject(Projects);
  readonly projects_list = signal<Project[]>([]);
  private flowbite = inject(Flowbite);
  readonly searchItem = signal<string>('');

  projectToDelete = signal<Project | null>(null);
  isDeleting = signal<boolean>(false);
  deleteError = signal<string>('');

  constructor() {
    effect(() => {
      const list = this.projects_list();
      if (list.length) {
        this.flowbite.loadFlowbite(() => {
          initFlowbite();
        });
      }
    });
  }
  ngOnInit() {
    this.projects.getAllProjects().subscribe({
      next: (res) => {
        this.projects_list.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  openDeleteModal(event: Event, project: Project) {
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
        this.projects_list.update((list) => list.filter((p) => p.id !== project.id));
        this.closeDeleteModal();
      },
      error: (err) => {
        this.isDeleting.set(false);
        console.log(err);
        this.deleteError.set(err.error?.message ?? 'Could not delete project. Try again.');
      },
    });
  }
}
