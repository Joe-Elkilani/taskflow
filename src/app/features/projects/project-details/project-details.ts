import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Projects } from '../../../core/services/projects/projects';
import { ProjectData } from '../../../shared/interface/project-data';
import { DatePipe } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-project-details',
  styleUrl: './project-details.css',
  templateUrl: './project-details.html',
})
export class ProjectDetails {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly projects = inject(Projects);
  projectId = signal<number>(0);
  project_data = signal<ProjectData | null>(null);
  constructor() {
    effect(() => {
      if (this.project_data()) {
        setTimeout(() => initFlowbite());
      }
    });
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        const id = res.get('id');
        if (id) {
          this.projectId.set(Number(id));
          this.projects.getProjectById(id).subscribe({
            next: (res) => {
              this.project_data.set(res);
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      },
    });
  }
}
