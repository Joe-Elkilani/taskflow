import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Tasks } from '../../../core/services/tasks/tasks';
import { Projects } from '../../../core/services/projects/projects';
import { Project } from '../../../shared/interface/project/project';
import { Auth } from '../../../core/services/auth/auth';
import { Flowbite } from '../../../core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';

interface TaskPayload {
  taskName: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  projectId: number;
  assignedToUserId: number;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.css',
  templateUrl: './task-form.html',
})
export class TaskForm {
  tasks = inject(Tasks);
  private projectsService = inject(Projects);
  private auth = inject(Auth);
  router = inject(Router);
  private flowbite = inject(Flowbite);
  private activatedRoute = inject(ActivatedRoute);

  isLoading = signal<boolean>(false);
  errormessage = signal<string>('');
  successmessage = signal<string>('');

  projects = signal<Project[]>([]);

  taskId = signal<string | null>(null);
  isEditMode = computed(() => this.taskId() !== null);

  taskForm: FormGroup = new FormGroup({
    taskName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(1000),
    ]),
    priority: new FormControl('Medium', [Validators.required]),
    status: new FormControl('Pending', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    projectId: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.flowbite.loadFlowbite(() => {
      initFlowbite();
    });

    this.projectsService.getAllProjects().subscribe({
      next: (res) => this.projects.set(res),
      error: () => this.errormessage.set('Could not load projects list.'),
    });

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.taskId.set(id);
      this.isLoading.set(true);
      this.tasks.getTaskById(id).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          this.taskForm.patchValue({
            taskName: res.taskName,
            description: res.description,
            priority: res.priority,
            status: res.status,
            dueDate: res.dueDate?.split('T')[0],
            projectId: res.projectId,
          });
        },
        error: () => {
          this.isLoading.set(false);
          this.errormessage.set('Could not load task data.');
        },
      });
    }
  }

  private buildPayload(): TaskPayload {
    const raw = this.taskForm.value;
    const currentUserId = this.auth.currentUser()?.id;

    return {
      taskName: raw.taskName,
      description: raw.description,
      dueDate: new Date(raw.dueDate).toISOString(),
      priority: raw.priority,
      status: raw.status,
      projectId: Number(raw.projectId),
      assignedToUserId: Number(currentUserId),
    };
  }

  onSubmit() {
    this.errormessage.set('');
    this.successmessage.set('');
    if (this.taskForm.invalid) return;

    if (!this.auth.currentUser()) {
      this.errormessage.set('You must be logged in to create a task.');
      return;
    }

    this.isLoading.set(true);

    const payload = this.buildPayload();

    const request$ = this.isEditMode()
      ? this.tasks.putTaskBYId(this.taskId()!, payload)
      : this.tasks.newTask(payload);

    request$.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successmessage.set(
          this.isEditMode() ? 'Task updated successfully!' : 'Task created successfully!',
        );
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 1000);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errormessage.set(err.error?.message ?? 'Something went wrong. Please try again.');
      },
    });
  }
}
