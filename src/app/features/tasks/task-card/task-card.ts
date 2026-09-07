import { Component, computed, input } from '@angular/core';
import { Task } from '../../../shared/interface/task';

@Component({
  imports: [],
  selector: 'tr[app-task-card]',
  styleUrl: './task-card.css',
  templateUrl: './task-card.html',
})
export class TaskCard {
  task = input.required<Task>();
  private readonly badgeBase = 'px-3 py-1 rounded-md text-xs font-medium border';

  priorityClass = computed(() => {
    const map: Record<string, string> = {
      High: 'bg-red-50 text-red-600 border-red-200',
      Medium: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      Low: 'bg-green-50 text-green-600 border-green-200',
    };
    return `${this.badgeBase} ${map[this.task().priority] ?? 'bg-gray-50 text-gray-600'}`;
  });

  statusClass = computed(() => {
    const map: Record<string, string> = {
      'In Progress': 'bg-blue-50 text-blue-600 border-blue-200',
      Completed: 'bg-green-50 text-green-600 border-green-200',
      Pending: 'bg-gray-100 text-gray-600 border-gray-200',
    };
    return `${this.badgeBase} ${map[this.task().status] ?? 'bg-gray-50 text-gray-600'}`;
  });
}
