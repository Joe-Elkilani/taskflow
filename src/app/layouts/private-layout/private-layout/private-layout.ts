import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { Footer } from '../../../shared/components/ui/footer/footer';

@Component({
  imports: [RouterOutlet, Sidebar, Footer],
  selector: 'app-private-layout',
  styleUrl: './private-layout.css',
  templateUrl: './private-layout.html',
})
export class PrivateLayout {}
