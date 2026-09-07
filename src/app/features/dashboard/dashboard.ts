import { Component } from '@angular/core';
import { ProjectCard } from '../projects/project-card/project-card';
import { Project } from '../../shared/interface/project';
import { TaskCard } from '../tasks/task-card/task-card';
import { Task } from '../../shared/interface/task';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ProjectCard, TaskCard, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  projects: Project[] = [
    {
      icon: 'fa-solid fa-cart-shopping',
      iconColor: 'text-blue-500',
      name: 'E-Commerce Platform',
      progress: 85,
      images: [
        'https://i.pravatar.cc/150?img=12',
        'https://i.pravatar.cc/150?img=32',
        'https://i.pravatar.cc/150?img=47',
        'https://i.pravatar.cc/150?img=5',
        'https://i.pravatar.cc/150?img=18',
      ],
    },
    {
      icon: 'fa-solid fa-mobile-screen-button',
      iconColor: 'text-purple-500',
      name: 'Mobile Banking App',
      progress: 68,
      images: [
        'https://i.pravatar.cc/150?img=11',
        'https://i.pravatar.cc/150?img=25',
        'https://i.pravatar.cc/150?img=44',
      ],
    },
    {
      icon: 'fa-solid fa-chart-line',
      iconColor: 'text-green-500',
      name: 'Analytics Dashboard',
      progress: 92,
      images: [
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=14',
        'https://i.pravatar.cc/150?img=28',
        'https://i.pravatar.cc/150?img=51',
        'https://i.pravatar.cc/150?img=60',
        'https://i.pravatar.cc/150?img=9',
      ],
    },
    {
      icon: 'fa-solid fa-calendar-check',
      iconColor: 'text-orange-500',
      name: 'Event Management System',
      progress: 54,
      images: [
        'https://i.pravatar.cc/150?img=8',
        'https://i.pravatar.cc/150?img=21',
        'https://i.pravatar.cc/150?img=36',
        'https://i.pravatar.cc/150?img=49',
      ],
    },
    {
      icon: 'fa-solid fa-plane',
      iconColor: 'text-cyan-500',
      name: 'Travel Booking App',
      progress: 37,
      images: [
        'https://i.pravatar.cc/150?img=16',
        'https://i.pravatar.cc/150?img=27',
        'https://i.pravatar.cc/150?img=39',
        'https://i.pravatar.cc/150?img=55',
        'https://i.pravatar.cc/150?img=67',
      ],
    },
  ];
  tasks: Task[] = [
    {
      taskName: 'Implement User Authentication',
      project: 'TaskFlow',
      dueDate: '2026-09-06',
      priority: 'High',
      status: 'In Progress',
    },
    {
      taskName: 'Design Dashboard UI',
      project: 'TaskFlow',
      dueDate: '2026-09-07',
      priority: 'High',
      status: 'Completed',
    },
    {
      taskName: 'Create Project Management API',
      project: 'TaskFlow',
      dueDate: '2026-09-09',
      priority: 'High',
      status: 'Pending',
    },
    {
      taskName: 'Fix Responsive Layout',
      project: 'E-Commerce Platform',
      dueDate: '2026-09-05',
      priority: 'Medium',
      status: 'In Progress',
    },
    {
      taskName: 'Add Product Search',
      project: 'E-Commerce Platform',
      dueDate: '2026-09-08',
      priority: 'Medium',
      status: 'Completed',
    },
    {
      taskName: 'Update Project Documentation',
      project: 'Analytics Dashboard',
      dueDate: '2026-09-10',
      priority: 'Low',
      status: 'Pending',
    },
  ];
}
