import { Component, input } from '@angular/core';
import { Project } from '../../../shared/interface/project';

@Component({
  imports: [],
  selector: 'app-project-card',
  styleUrl: './project-card.css',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<Project>();
}
