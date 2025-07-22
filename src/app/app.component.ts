import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutSectionComponent } from './components/about-section/about-section.component';

import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, AboutSectionComponent],
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'bus-booking-app';
  isLoginRoute = false;
  currentUrl = '';

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      this.currentUrl = url;
      this.isLoginRoute = url === '/login' || url === '/signup';
    });
  }

  isRateJourneyPage(): boolean {
    return this.currentUrl.startsWith('/rate-journey');
  }
  viewseats(): boolean {
    return this.currentUrl.startsWith('/product-showcase') ;
  }
}