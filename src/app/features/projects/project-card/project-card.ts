import { Component, input } from '@angular/core';
import { IProjectCard } from '../../../shared/interface/iproject_card/iproject-card';

@Component({
  imports: [],
  selector: 'app-project-card',
  styleUrl: './project-card.css',
  templateUrl: './project-card.html',
})
export class ProjectCard {
  project = input.required<IProjectCard>();
}
