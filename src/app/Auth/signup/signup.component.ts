// signup.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="flex h-screen bg-gray-50">
      <!-- Success Popup (hidden by default) -->
      <div *ngIf="showSuccessPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl transform transition-all duration-300 scale-95 animate-fade-in">
          <div class="flex justify-center mb-4">
            <div class="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h3 class="text-xl font-bold text-gray-900 text-center font-['Poppins'] mb-2">Success!</h3>
          <p class="text-gray-600 text-center mb-6">You have successfully created your account.</p>
          <button 
            (click)="closePopup()"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>

      <!-- Left side - Content -->
      <div class="hidden md:flex md:w-2/5 lg:w-2/3 bg-gradient-to-br from-red-600 to-red-800 items-center justify-center p-8">
        <div class="text-white max-w-md">
          <div class="flex justify-center mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2786/2786394.png" 
              alt="Bus logo" 
              class="h-14 w-auto"
            >
          </div>
          <h3 class="text-2xl font-bold font-['Poppins'] mb-4">Welcome to SwiftJourney</h3>
          <p class="text-md mb-6">Join thousands of travelers enjoying seamless bus bookings.</p>
          <div class="space-y-3">
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Instant booking confirmation</span>
            </div>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Exclusive member discounts</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right side - Form -->
      <div class="w-full md:w-3/5 lg:w-1/2 bg-white p-6 flex items-center justify-center">
        <div class="max-w-md w-full">
          <div class="md:hidden flex justify-center mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/2786/2786394.png" 
              alt="Bus logo" 
              class="h-12 w-auto"
            >
          </div>
          
          <h2 class="text-xl font-bold text-gray-900 text-center font-['Poppins'] mb-6">
            Create your account
          </h2>

          <form class="space-y-4" (ngSubmit)="onSubmit()">
            <!-- Name Field -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                [(ngModel)]="name"
                (input)="enableNextField('name')"
                autocomplete="name" 
                required 
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              >
            </div>

            <!-- Email Field -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                [(ngModel)]="email"
                (input)="enableNextField('email')"
                [disabled]="!name"
                autocomplete="email" 
                required 
                [class.opacity-50]="!name"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition"
              >
            </div>

            <!-- Password Field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div class="relative">
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  [(ngModel)]="password"
                  (input)="enableNextField('password')"
                  [disabled]="!email"
                  autocomplete="new-password" 
                  required 
                  [class.opacity-50]="!email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition"
                >
              </div>
              <p class="mt-1 text-xs text-gray-500">
                Must be at least 8 characters long
              </p>
            </div>

            <!-- Confirm Password Field -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                [(ngModel)]="confirmPassword"
                [disabled]="!password"
                autocomplete="new-password" 
                required 
                [class.opacity-50]="!password"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm transition"
              >
            </div>

            <!-- Terms Checkbox -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input 
                  id="terms" 
                  name="terms" 
                  type="checkbox" 
                  [(ngModel)]="acceptTerms"
                  required
                  class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                >
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="text-gray-700">
                  I agree to the <a href="#" class="text-red-600 hover:text-red-500">Terms and conditions</a>
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <div>
              <button 
                type="submit" 
                [disabled]="!isFormValid()"
                [class.opacity-50]="!isFormValid()"
                [class.cursor-not-allowed]="!isFormValid()"
                class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    
    :host {
      display: block;
      height: 100vh;
    }

    /* Animation for the popup */
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `]
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;
  showSuccessPopup = false;

  constructor(private router: Router) {}

  enableNextField(field: string) {
    // This method ensures the next field is enabled when current field has value
    // The actual enabling is handled by the [disabled] binding in the template
  }

  isFormValid(): boolean {
    return !!this.name && !!this.email && !!this.password && !!this.confirmPassword && this.acceptTerms;
  }

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Signup submitted:', {
        name: this.name,
        email: this.email,
        password: this.password
      });
      // Show success popup instead of immediate navigation
      this.showSuccessPopup = true;
    }
  }

  closePopup() {
    this.showSuccessPopup = false;
    this.router.navigate(['/']);
  }
}