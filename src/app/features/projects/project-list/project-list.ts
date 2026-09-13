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
}
