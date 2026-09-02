import { Component, inject } from '@angular/core';
import { Flowbite } from '../../../core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-sidebar',
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private flowbite = inject(Flowbite);
  ngOnInit(): void {
    this.flowbite.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
