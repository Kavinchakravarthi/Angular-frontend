import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeSectionComponent } from './components/home-section/home-section.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, HomeSectionComponent, AboutSectionComponent],
  template: `
    <ng-container *ngIf="!isLoginRoute">
      <app-navbar></app-navbar>
    </ng-container>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'bus-booking-app';
  isLoginRoute = false;

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      console.log('Current route:', url);
      this.isLoginRoute = url === '/login' || url === '/signup';
    });
  }
}