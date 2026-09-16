import { Component, computed, inject, signal } from '@angular/core';
import { Auth } from '../../core/services/auth/auth';

@Component({
  imports: [],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings {
  private readonly auth = inject(Auth);

  currentUser = this.auth.currentUser;

  initials = computed(() => {
    const name = this.currentUser()?.fullName;
    if (!name) return '?';
    return name
      .trim()
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join('');
  });

  emailAlerts = signal<boolean>(true);
  taskReminders = signal<boolean>(true);
  weeklyDigest = signal<boolean>(false);

  ngOnInit(): void {
    if (!this.currentUser()) {
      this.auth.fetchCurrentUser().subscribe();
    }
  }

  toggleEmailAlerts() {
    this.emailAlerts.update((v) => !v);
  }

  toggleTaskReminders() {
    this.taskReminders.update((v) => !v);
  }

  toggleWeeklyDigest() {
    this.weeklyDigest.update((v) => !v);
  }
}
