// account-offcanvas.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-offcanvas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="offcanvas offcanvas-end fixed bottom-0 right-0 top-0 flex w-full max-w-xs flex-col border-l border-gray-200 bg-white shadow-xl z-50">
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">My Account</h2>
        <button (click)="closeOffcanvas()" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">Close panel</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        <!-- User Info Section -->
        <div *ngIf="isLoggedIn; else loginSection" class="mb-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
              <span class="text-red-600 font-medium">{{userInitials}}</span>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">{{userName}}</h3>
              <p class="text-xs text-gray-500">{{userEmail}}</p>
            </div>
          </div>
          <button 
            (click)="navigateToProfile()"
            class="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <span>My Details</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <ng-template #loginSection>
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-900 mb-2">Welcome to Swift Journey</h3>
            <p class="text-xs text-gray-500 mb-4">Sign up to access your bookings and exclusive offers</p>
            <div class="mb-3 text-center">
              <a href="#" (click)="$event.preventDefault(); navigateToLogin()" class="text-xs text-red-600 hover:underline">Already have an account? Login</a>
            </div>
            <button 
              (click)="navigateToSignup()"
              class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md"
            >
              Sign Up
            </button>
          </div>
        </ng-template>

        <!-- Menu Options -->
        <div class="space-y-1">
          <a 
            *ngIf="isLoggedIn"
            routerLink="/my-bookings"
            (click)="closeOffcanvas()"
            class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Bookings
          </a>

          <a 
            routerLink="/cancel-ticket"
            (click)="closeOffcanvas()"
            class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

            Cancel Ticket
          </a>

          <a 
            routerLink="/offers"
            (click)="closeOffcanvas()"
            class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>
            Offers
          </a>

          <a 
            routerLink="/aboutus"
            (click)="closeOffcanvas()"
            class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
</svg>

            Know More About Us
          </a>

          <a 
            routerLink="/bookings"
            (click)="closeOffcanvas()"
            class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
   </svg>

            bookings
          </a>

            <button 
              (click)="logout()"
              class="w-full flex items-center justify-center px-4 mt-8 py-2 text-sm text-red-600 bg-red-50 rounded-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AccountOffcanvasComponent {
  @Output() close = new EventEmitter<void>();

  // For demo purposes - in real app, these would come from auth service
  isLoggedIn = false;
  userName = 'John Doe';
  userEmail = 'john.doe@example.com';
  userInitials = 'JD';
  bookingsAndLogout() {
    // Log out the user and navigate to bookings
    this.isLoggedIn = false;
    this.closeOffcanvas();
    this.router.navigate(['/my-bookings']);
  }

  closeOffcanvas() {
    this.close.emit();
  }

  constructor(private router: Router) {}

  navigateToLogin() {
    this.closeOffcanvas();
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    // In real app: this.router.navigate(['/signup']);
    console.log('Navigate to signup');
    this.closeOffcanvas();
    this.router.navigate(['/signup']);
  }

  navigateToProfile() {
    // In real app: this.router.navigate(['/profile']);
    console.log('Navigate to profile');
    this.closeOffcanvas();
  }

  logout() {
    // In real app: call auth service logout
    console.log('User logged out');
    this.isLoggedIn = false;
    this.closeOffcanvas();
  }
}