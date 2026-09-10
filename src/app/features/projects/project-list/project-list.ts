import { afterNextRender, Component, effect, inject, signal } from '@angular/core';
import { Projects } from '../../../core/services/projects/projects';
import { Project } from '../../../shared/interface/project/project';
import { Flowbite } from '../../../core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [],
  selector: 'app-project-list',
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList {
  private readonly projects = inject(Projects);
  readonly projects_list = signal<Project[]>([]);
  private flowbite = inject(Flowbite);

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
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
