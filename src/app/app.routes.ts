import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { PublicLayout } from './layouts/public-layout/public-layout/public-layout';
import { PrivateLayout } from './layouts/private-layout/private-layout/private-layout';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: 'home', component: Home, title: 'Home' },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then((c) => c.Login),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then((c) => c.Register),
        title: 'Register',
      },
    ],
  },
  {
    path: '',
    component: PrivateLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((c) => c.Dashboard),
        title: 'Dashboard',
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./features/projects/project-list/project-list').then((c) => c.ProjectList),
        title: 'Projects',
      },
      {
        path: 'projectsform',
        loadComponent: () =>
          import('./features/projects/project-form/project-form').then((c) => c.ProjectForm),
        title: 'Projects Form',
      },
      {
        path: 'tasks',
        loadComponent: () => import('./features/tasks/task-list/task-list').then((c) => c.TaskList),
        title: 'Tasks',
      },
      {
        path: 'tasksform',
        loadComponent: () => import('./features/tasks/task-form/task-form').then((c) => c.TaskForm),
        title: 'Tasks Form',
      },
      // {
      //   path: 'projects/:id',
      //   loadComponent: () =>
      //     import('./features/projects/project-details/project-details').then(
      //       (c) => c.ProjectDetails,
      //     ),
      //   title: 'Project Details',
      // },
      // {
      //   path: 'tasks/:id',
      //   loadComponent: () =>
      //     import('./features/tasks/task-details/task-details').then((c) => c.TaskDetails),
      //   title: 'Task Details',
      // },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/settings').then((c) => c.Settings),
        title: 'Settings',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then((c) => c.NotFound),
    title: 'Not Found',
  },
];
