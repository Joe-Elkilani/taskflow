import { Component, effect, inject, signal } from '@angular/core';
import { Tasks } from '../../../core/services/tasks/tasks';
import { Flowbite } from '../../../core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { SearchPipe } from '../../../shared/pipes/search-pipe';
import { RouterLink } from '@angular/router';
import { Itask } from '../../../shared/interface/tasks/itask';
import { DatePipe } from '@angular/common';

@Component({
  imports: [SearchPipe, RouterLink, DatePipe],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  private readonly tasks = inject(Tasks);
  readonly tasks_list = signal<Itask[]>([]);
  private flowbite = inject(Flowbite);
  readonly searchItem = signal<string>('');

  projectToDelete = signal<any | null>(null);
  isDeleting = signal<boolean>(false);
  deleteError = signal<string>('');

  constructor() {
    effect(() => {
      const list = this.tasks_list();
      if (list.length) {
        this.flowbite.loadFlowbite(() => {
          initFlowbite();
        });
      }
    });
  }
  ngOnInit() {
    this.tasks.getAllTasks().subscribe({
      next: (res) => {
        this.tasks_list.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  priorityBarClass(priority: string): string {
    const p = priority?.toLowerCase();
    if (p === 'high') return 'bg-red-500';
    if (p === 'medium') return 'bg-amber-500';
    if (p === 'low') return 'bg-emerald-500';
    return 'bg-neutral-secondary-medium';
  }

  priorityBadgeClass(priority: string): string {
    const p = priority?.toLowerCase();
    if (p === 'high') return 'bg-red-50 text-red-600 border-red-200';
    if (p === 'medium') return 'bg-amber-50 text-amber-600 border-amber-200';
    if (p === 'low') return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    return 'bg-neutral-secondary-medium text-body border-default-medium';
  }

  statusClass(status: string): string {
    const s = status?.toLowerCase();
    if (s === 'done' || s === 'completed')
      return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    if (s === 'in progress') return 'bg-blue-50 text-blue-600 border-blue-200';
    return 'bg-neutral-secondary-medium text-body border-default-medium';
  }

  isOverdue(task: Itask): boolean {
    const done =
      task.status?.toLowerCase() === 'done' || task.status?.toLowerCase() === 'completed';
    return !done && new Date(task.dueDate) < new Date();
  }

  initials(name: string): string {
    if (!name) return '?';
    return name
      .trim()
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join('');
  }

  openDeleteModal(event: Event, project: any) {
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
    this.tasks.deleteTaskById(String(project.id)).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.tasks_list.update((list) => list.filter((p) => p.id !== project.id));
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
