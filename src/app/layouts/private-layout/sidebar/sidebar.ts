import { Component, inject } from '@angular/core';
import { Flowbite } from '../../../core/services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [],
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
