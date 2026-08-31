import { Flowbite } from './../../../../core/services/flowbite/flowbite';
import { Component, inject, signal } from '@angular/core';
import { Links } from '../../../interface/links';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  links = signal<Links[]>([
    { Title: 'Home', routerLink: '/home' },
    { Title: 'Login', routerLink: '/login' },
    { Title: 'Register', routerLink: '/register' },
  ]);
  private flowbite = inject(Flowbite);
  ngOnInit(): void {
    this.flowbite.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
