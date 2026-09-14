import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../../../core/services/auth/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  private readonly auth = inject(Auth);

  currentUser = this.auth.currentUser;
  isMenuOpen = false;

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  logout() {
    this.closeMenu();
    this.auth.logout();
  }
}
