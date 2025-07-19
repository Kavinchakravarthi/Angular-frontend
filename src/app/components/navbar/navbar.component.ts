import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountOffcanvasComponent } from '../account-offcanvas/account-offcanvas.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AccountOffcanvasComponent],
  template: `
    <nav class="bg-white text-red-600 shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo and app name -->
          <div class="flex-shrink-0 flex items-center">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2786/2786394.png" 
              alt="Bus logo" 
              class="h-8 w-8 mr-2"
            >
            <a routerLink="/" class="text-xl font-bold font-['Poppins']">SwiftJourney</a>
          </div>
          
          <!-- Navigation links -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-center space-x-4">
              <a 
                routerLink="/bookings" 
                class="px-3 py-2 rounded-md text-sm font-medium font-['Poppins'] hover:bg-red-200 transition duration-300"
              >
                My Bookings
              </a>
              <button 
                (click)="showAccountOffcanvas = true"
                class="px-3 py-2 rounded-md text-sm font-medium font-['Poppins'] hover:bg-red-200 transition duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Account
              </button>
            </div>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button 
              type="button" 
              class="inline-flex items-center justify-center p-2 rounded-md text-red-600 hover:bg-red-200 focus:outline-none transition duration-300"
              (click)="toggleMenu()"
            >
              <svg 
                class="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  [attr.d]="isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div 
        class="md:hidden" 
        [class.hidden]="!isMenuOpen"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a 
            routerLink="/bookings" 
            class="block px-3 py-2 rounded-md text-base font-medium font-['Poppins'] hover:bg-red-200 transition duration-300"
            (click)="toggleMenu()"
          >
            My Bookings
          </a>
          <button 
            (click)="showAccountOffcanvas = true; toggleMenu()"
            class="w-full text-left block px-3 py-2 rounded-md text-base font-medium font-['Poppins'] hover:bg-red-200 transition duration-300 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Account
          </button>
        </div>
      </div>

      <!-- Overlay for opacity when offcanvas is open -->
      <div 
        *ngIf="showAccountOffcanvas" 
        class="offcanvas-overlay"
        (click)="showAccountOffcanvas = false"
      ></div>

      <!-- Account Offcanvas -->
      <app-account-offcanvas 
        *ngIf="showAccountOffcanvas" 
        (close)="showAccountOffcanvas = false"
      ></app-account-offcanvas>
    </nav>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
    nav {
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    /* Offcanvas overlay */
    app-account-offcanvas {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      max-width: 320px;
      background-color: white;
      box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
      transform: translateX(0);
      transition: transform 0.3s ease-in-out;
      z-index: 1100;
    }

    /* Overlay for offcanvas (redBus style) */
    .offcanvas-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.55);
      z-index: 1049;
      transition: background 0.3s;
    }
  `]
})
export class NavbarComponent {
  isMenuOpen = false;
  showAccountOffcanvas = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}