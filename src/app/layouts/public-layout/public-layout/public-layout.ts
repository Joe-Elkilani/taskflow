import { Component } from '@angular/core';
import { Navbar } from '../../../shared/components/ui/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../../shared/components/ui/footer/footer';

@Component({
  imports: [Navbar, RouterOutlet, Footer],
  selector: 'app-public-layout',
  styleUrl: './public-layout.css',
  templateUrl: './public-layout.html',
})
export class PublicLayout {}
