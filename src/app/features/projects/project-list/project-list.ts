import { Component, inject, signal } from '@angular/core';
import { Projects } from '../../../core/services/projects/projects';
import { Project } from '../../../shared/interface/project/project';

@Component({
  imports: [],
  selector: 'app-project-list',
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList {
  private readonly projects = inject(Projects);
  readonly projects_list = signal<Project[]>([]);
  ngOnInit() {
    this.projects.getAllProjects().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
