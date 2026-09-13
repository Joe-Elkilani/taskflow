import { Component, effect, inject, signal } from '@angular/core';
import { Projects } from '../../../core/services/projects/projects';
import { Project } from '../../../shared/interface/project/project';
import { Flowbite } from '../../../core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { Tasks } from '../../../core/services/tasks/tasks';
import { forkJoin } from 'rxjs';
import { Itask } from '../../../shared/interface/tasks/itask';

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
  private readonly tasks = inject(Tasks);

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
    forkJoin({
      projects: this.projects.getAllProjects(),
      tasks: this.tasks.getAllTasks(),
    }).subscribe({
      next: ({ projects, tasks }) => {
        const withProgress = projects.map((project) => ({
          ...project,
          progress: this.computeProgress(project, tasks),
        }));
        this.projects_list.set(withProgress);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  private computeProgress(project: Project, tasks: Itask[]): number {
    const projectTasks = tasks.filter((t) => t.project === project.name);
    if (projectTasks.length === 0) return 0;

    const completed = projectTasks.filter((t) => t.status?.toLowerCase() === 'completed').length;

    return Math.round((completed / projectTasks.length) * 100);
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
