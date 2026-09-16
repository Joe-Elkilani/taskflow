import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'projects/:id/edit',
    renderMode: RenderMode.Server,
  },
  {
    path: 'task/:id/edit',
    renderMode: RenderMode.Server,
  },
  {
    path: 'project-details/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: 'task-details/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
