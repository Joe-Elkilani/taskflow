import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Tasks } from '../../../core/services/tasks/tasks';
import { Itask } from '../../../shared/interface/tasks/itask';
import { DatePipe } from '@angular/common';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-task-details',
  styleUrl: './task-details.css',
  templateUrl: './task-details.html',
})
export class TaskDetails {
  private readonly tasksService = inject(Tasks);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  task = signal<Itask | null>(null);
  isLoading = signal<boolean>(true);
  errormessage = signal<string>('');

  showDeleteModal = signal<boolean>(false);
  isDeleting = signal<boolean>(false);
  deleteError = signal<string>('');

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.errormessage.set('Task not found.');
      this.isLoading.set(false);
      return;
    }

    this.tasksService.getTaskById(id).subscribe({
      next: (res) => {
        this.task.set(res);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.errormessage.set('Could not load task details.');
      },
    });
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
    if (s === 'completed') return 'bg-emerald-50 text-emerald-600 border-emerald-200';
    if (s === 'in progress') return 'bg-blue-50 text-blue-600 border-blue-200';
    return 'bg-neutral-secondary-medium text-body border-default-medium';
  }

  isOverdue(task: Itask): boolean {
    const done = task.status?.toLowerCase() === 'completed';
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

  openDeleteModal() {
    this.deleteError.set('');
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
  }

  confirmDelete() {
    const task = this.task();
    if (!task) return;

    this.isDeleting.set(true);
    this.tasksService.deleteTaskById(String(task.id)).subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.isDeleting.set(false);
        this.deleteError.set(err.error?.message ?? 'Could not delete task. Try again.');
      },
    });
  }
}
