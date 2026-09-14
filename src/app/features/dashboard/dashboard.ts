import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProjectCard } from '../projects/project-card/project-card';
import { TaskCard } from '../tasks/task-card/task-card';
import { Projects } from '../../core/services/projects/projects';
import { Tasks } from '../../core/services/tasks/tasks';
import { Project } from '../../shared/interface/project/project';
import { Itask } from '../../shared/interface/tasks/itask';
import { IProjectCard } from '../../shared/interface/iproject_card/iproject-card';
import { Task } from '../../shared/interface/task';

const PROJECT_STYLES: { icon: string; color: string }[] = [
  { icon: 'fa-solid fa-diagram-project', color: 'text-blue-500' },
  { icon: 'fa-solid fa-rocket', color: 'text-purple-500' },
  { icon: 'fa-solid fa-chart-line', color: 'text-green-500' },
  { icon: 'fa-solid fa-layer-group', color: 'text-orange-500' },
  { icon: 'fa-solid fa-lightbulb', color: 'text-cyan-500' },
];

@Component({
  imports: [ProjectCard, TaskCard, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private readonly projectsService = inject(Projects);
  private readonly tasksService = inject(Tasks);

  private readonly allProjects = signal<Project[]>([]);
  private readonly allTasks = signal<Itask[]>([]);

  isLoading = signal<boolean>(true);
  errormessage = signal<string>('');

  totalProjects = computed(() => this.allProjects().length);

  openTasks = computed(
    () => this.allTasks().filter((t) => t.status?.toLowerCase() !== 'completed').length,
  );

  dueToday = computed(() => {
    const today = new Date().toDateString();
    return this.allTasks().filter(
      (t) =>
        t.status?.toLowerCase() !== 'completed' && new Date(t.dueDate).toDateString() === today,
    ).length;
  });

  completedTasks = computed(
    () => this.allTasks().filter((t) => t.status?.toLowerCase() === 'completed').length,
  );

  projects = computed<IProjectCard[]>(() => {
    const tasks = this.allTasks();
    return [...this.allProjects()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map((project, index) => {
        const style = PROJECT_STYLES[index % PROJECT_STYLES.length];
        return {
          icon: style.icon,
          iconColor: style.color,
          name: project.name,
          progress: this.computeProgress(project, tasks),
          images: [],
        };
      });
  });

  tasks = computed<Task[]>(() =>
    [...this.allTasks()]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 6),
  );

  ngOnInit(): void {
    forkJoin({
      projects: this.projectsService.getAllProjects(),
      tasks: this.tasksService.getAllTasks(),
    }).subscribe({
      next: ({ projects, tasks }) => {
        this.allProjects.set(projects);
        this.allTasks.set(tasks);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.errormessage.set('Could not load dashboard data.');
      },
    });
  }

  private computeProgress(project: Project, tasks: Itask[]): number {
    const projectTasks = tasks.filter((t) => t.project === project.name);
    if (projectTasks.length === 0) return 0;
    const completed = projectTasks.filter((t) => t.status?.toLowerCase() === 'completed').length;
    return Math.round((completed / projectTasks.length) * 100);
  }
}
