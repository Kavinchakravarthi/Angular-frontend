// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center pt-2 pb-2 sm:px-2 lg:px-2">
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
          <h3 class="text-xl font-bold text-gray-900 text-center font-['Poppins'] mb-2">Login Successful!</h3>
          <p class="text-gray-600 text-center mb-6">You have successfully logged in to your account.</p>
          <button 
            (click)="closePopup()"
            class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>

      <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div class="flex justify-center mb-2">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2786/2786394.png" 
            alt="Bus logo" 
            class="h-12 w-auto"
          >
        </div>
        <div class="flex items-center w-full justify-center mb-4">
          <button (click)="goHome()" class="flex items-center text-red-600 hover:text-red-700 font-medium mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h2 class="text-3xl font-extrabold text-gray-900 font-['Poppins']">
            Sign in to your account
          </h2>
        </div>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          <a routerLink="/register" class="font-medium text-red-600 hover:text-red-500">
            create a new account
          </a>
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6" (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div class="mt-1">
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  [(ngModel)]="email"
                  #emailInput="ngModel"
                  autocomplete="email" 
                  required 
                  email
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                  [class.border-gray-300]="!emailInput.invalid || (!emailInput.touched && !loginForm.submitted)"
                  [class.border-red-300]="(emailInput.invalid && (emailInput.touched || loginForm.submitted))"
                  [class.focus:ring-red-500]="emailInput.invalid"
                  [class.focus:border-red-500]="emailInput.invalid"
                >
                <div *ngIf="emailInput.invalid && (emailInput.touched || loginForm.submitted)" class="mt-1 text-sm text-red-600">
                  <span *ngIf="emailInput.errors?.['required']">Email is required</span>
                  <span *ngIf="emailInput.errors?.['email'] || emailInput.errors?.['pattern']">Please enter a valid email address</span>
                </div>
              </div>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="mt-1 relative">
                <input 
                  id="password" 
                  name="password" 
                  type="{{ showPassword ? 'text' : 'password' }}" 
                  [(ngModel)]="password"
                  #passwordInput="ngModel"
                  autocomplete="current-password" 
                  required 
                  minlength="8"
                  [disabled]="!email"
                  class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm"
                  [class.border-gray-300]="!passwordInput.invalid || (!passwordInput.touched && !loginForm.submitted)"
                  [class.border-red-300]="(passwordInput.invalid && (passwordInput.touched || loginForm.submitted))"
                  [class.focus:ring-red-500]="passwordInput.invalid"
                  [class.focus:border-red-500]="passwordInput.invalid"
                >
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button 
                    type="button" 
                    class="text-gray-500 hover:text-gray-600"
                    (click)="togglePasswordVisibility()"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path *ngIf="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path *ngIf="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      <path *ngIf="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
                <div *ngIf="passwordInput.invalid && (passwordInput.touched || loginForm.submitted)" class="mt-1 text-sm text-red-600">
                  <span *ngIf="passwordInput.errors?.['required']">Password is required</span>
                  <span *ngIf="passwordInput.errors?.['minlength']">Password must be at least 8 characters</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  [(ngModel)]="rememberMe"
                  class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                >
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a routerLink="/forgot-password" class="font-medium text-red-600 hover:text-red-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                [disabled]="loginForm.invalid"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300"
                [class.bg-red-600]="!loginForm.invalid"
                [class.hover:bg-red-700]="!loginForm.invalid"
                [class.focus:ring-red-500]="!loginForm.invalid"
                [class.bg-red-400]="loginForm.invalid"
                [class.cursor-not-allowed]="loginForm.invalid"
              >
                Sign in
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
      height: 100%;
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
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  showSuccessPopup = false;
  showPassword = false;

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.email || !this.password) {
      return;
    }

    // In a real app, you would call your authentication service here
    console.log('Login submitted:', {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    });

    // Show success popup instead of immediate navigation
    this.showSuccessPopup = true;
  }

  closePopup() {
    this.showSuccessPopup = false;
    this.router.navigate(['/']);
  }
}