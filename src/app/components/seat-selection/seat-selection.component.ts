import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  template: `
    <div class="bg-gray-50 min-h-screen pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Booking Progress (Sticky Stepper) -->
        <div class="stepper-fixed z-50 bg-gray-100 pt-5 ">
          <nav class="flex items-center justify-center">
            <ol class="flex items-center space-x-5 mb-2">
              <li *ngFor="let step of steps; let i = index" class="flex items-center">
                <div [ngClass]="{
                  'bg-red-600 text-white': currentStep >= i + 1,
                  'bg-white border-2 border-gray-300 text-gray-500': currentStep < i + 1
                }" class="w-8 h-8 rounded-full flex items-center justify-center font-medium">
                  {{i + 1}}
                </div>
                <span [ngClass]="{
                  'text-gray-500': currentStep < i + 1,
                  'font-medium text-gray-900': currentStep >= i + 1
                }" class="ml-3 text-sm">{{step}}</span>
                <svg *ngIf="i < steps.length - 1" class="w-5 h-5 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </li>
            </ol>
          </nav>
        </div>
        <!-- Spacer for stepper height (matches .stepper-fixed height) -->
        <div class="stepper-spacer"></div>

        <!-- Step 1: Seat Selection -->
        <div *ngIf="currentStep === 1" class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Select Your Seats</h2>
            
            <!-- Bus Info -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 class="text-lg font-medium">{{bus.name}}</h3>
                <div class="flex items-center mt-1">
                  <div class="flex text-yellow-400">
                    <span *ngFor="let star of [1,2,3,4,5]">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" [class.text-yellow-400]="star <= bus.rating" [class.text-gray-300]="star > bus.rating" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </div>
                  <span class="ml-2 text-sm text-gray-600">{{bus.rating}} ({{bus.reviews}} reviews)</span>
                </div>
              </div>
              <div class="mt-4 md:mt-0">
                <div class="text-lg font-medium text-red-600">₹{{totalPrice}}</div>
                <div class="text-sm text-gray-500">{{selectedSeats.length}} seat(s) selected</div>
              </div>
            </div>

            <!-- Seat Selection Layout (Two Columns) -->
            <div class="flex flex-col lg:flex-row gap-8 mt-6">
              <!-- Left Column - Seat Types Legend -->
              <div class="lg:w-1/4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">Seat Types</h3>
                <div class="space-y-4">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-white border-2 border-gray-400 rounded mr-3"></div>
                    <span class="text-sm">Available</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-white border-2 border-blue-400 rounded mr-3"></div>
                    <span class="text-sm">Available only for male passenger</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-gray-200 rounded mr-3"></div>
                    <span class="text-sm">Already booked</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-green-100 border-2 border-green-400 rounded mr-3"></div>
                    <span class="text-sm">Selected by you</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-white border-2 border-pink-400 rounded mr-3"></div>
                    <span class="text-sm">Available only for female passenger</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-pink-100 border-2 border-pink-400 rounded mr-3"></div>
                    <span class="text-sm">Booked by female passenger</span>
                  </div>
                </div>
              </div>

              <!-- Right Column - Seat Selection -->
              <div class="lg:w-3/4">
                <!-- Gender Selection -->
                <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 class="text-sm font-medium text-gray-700 mb-3">Select passenger gender to see available seats:</h3>
                  <div class="flex space-x-4">
                    <button 
                      (click)="setCurrentGender('male')"
                      [ngClass]="{
                        'bg-blue-100 border-blue-500 text-blue-700': currentGender === 'male',
                        'bg-white border-gray-300 text-gray-700': currentGender !== 'male'
                      }"
                      class="px-4 py-2 border rounded-md flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Male
                    </button>
                    <button 
                      (click)="setCurrentGender('female')"
                      [ngClass]="{
                        'bg-pink-100 border-pink-500 text-pink-700': currentGender === 'female',
                        'bg-white border-gray-300 text-gray-700': currentGender !== 'female'
                      }"
                      class="px-4 py-2 border rounded-md flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Female
                    </button>
                  </div>
                </div>

                <!-- Bus Seats Layout -->
                <div class="relative">
                  <!-- Bus outline -->
                  <div class="absolute inset-0 border-2 border-gray-300 rounded-lg pointer-events-none" style="margin: 20px;"></div>
                  <div class="relative z-10">
                    <div class="flex flex-col md:flex-row gap-8 justify-center items-start">
                      <!-- Lower Berth Section -->
                      <div class="flex-1 mb-8 md:mb-0">
                        <h3 class="text-md font-semibold text-gray-700 mb-2 text-center">Lower Berth</h3>
                        <!-- Main grid with 2 cols: Col 1 + [Col 2 & 3 combined] -->
                        <div class="grid grid-rows-5 grid-cols-[auto_auto] gap-y-1.5 p-2 bg-gray-50 rounded-lg">
                          <ng-container *ngFor="let row of lowerBerthMap; let rowIdx = index">
                            <!-- Column 1 -->
                            <ng-container *ngFor="let seatNum of row; let colIdx = index">
                              <ng-container *ngIf="colIdx === 0">
                                <div class="flex justify-center items-center" style="min-width: 2.5rem; min-height: 4rem;">
                                  <button
                                    *ngIf="seatNum !== null"
                                    [disabled]="!isSeatAvailable(seats[seatNum - 1])"
                                    [ngClass]="getSeatClasses(seats[seatNum - 1])"
                                    class="w-10 h-16 rounded flex flex-col items-center justify-center font-medium text-xs transition relative border"
                                    (click)="toggleSeatSelection(seats[seatNum - 1])"
                                    [title]="getSeatTooltip(seats[seatNum - 1])"
                                  >
                                    <span>{{ seats[seatNum - 1].number }}</span>
                                    <span class="text-[10px] mt-1">₹{{ bus.price }}</span>
                                    <div *ngIf="seats[seatNum - 1].gender" class="absolute top-0 right-0 w-3 h-3 rounded-full"
                                      [ngClass]="{
                                        'bg-blue-500': seats[seatNum - 1].gender === 'male',
                                        'bg-pink-500': seats[seatNum - 1].gender === 'female'
                                      }"></div>
                                    <div *ngIf="seats[seatNum - 1].type === 'ladies'"
                                      class="absolute -top-1 -right-1 bg-pink-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">
                                      L
                                    </div>
                                  </button>
                                </div>
                              </ng-container>
                            </ng-container>

                            <!-- Column 2 and 3 as nested grid with small gap -->
                            <div class="grid grid-cols-[min-content_min-content] gap-x-4">
                              <ng-container *ngFor="let seatNum of row; let colIdx = index">
                                <ng-container *ngIf="colIdx === 1 || colIdx === 2">
                                  <div class="flex justify-center items-center" style="min-width: 2.5rem; min-height: 4rem;">
                                    <button
                                      *ngIf="seatNum !== null"
                                      [disabled]="!isSeatAvailable(seats[seatNum - 1])"
                                      [ngClass]="getSeatClasses(seats[seatNum - 1])"
                                      class="w-10 h-16 rounded flex flex-col items-center justify-center font-medium text-xs transition relative border"
                                      (click)="toggleSeatSelection(seats[seatNum - 1])"
                                      [title]="getSeatTooltip(seats[seatNum - 1])"
                                    >
                                      <span>{{ seats[seatNum - 1].number }}</span>
                                      <span class="text-[10px] mt-1">₹{{ bus.price }}</span>
                                      <div *ngIf="seats[seatNum - 1].gender" class="absolute top-0 right-0 w-3 h-3 rounded-full"
                                        [ngClass]="{
                                          'bg-blue-500': seats[seatNum - 1].gender === 'male',
                                          'bg-pink-500': seats[seatNum - 1].gender === 'female'
                                        }"></div>
                                      <div *ngIf="seats[seatNum - 1].type === 'ladies'"
                                        class="absolute -top-1 -right-1 bg-pink-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">
                                        L
                                      </div>
                                    </button>
                                  </div>
                                </ng-container>
                              </ng-container>
                            </div>
                          </ng-container>
                        </div>
                      </div>

                      <!-- Upper Berth Section -->
                      <div class="flex-1">
                        <h3 class="text-md font-semibold text-gray-700 mb-2 text-center">Upper Berth</h3>
                        <!-- Main grid with 2 cols: Col 1 + [Col 2 & 3 combined] -->
                        <div class="grid grid-rows-5 grid-cols-[auto_auto] gap-y-1.5 p-2 bg-gray-50 rounded-lg">
                          <ng-container *ngFor="let row of upperBerthMap; let rowIdx = index">
                            <!-- Column 1 -->
                            <ng-container *ngFor="let seatNum of row; let colIdx = index">
                              <ng-container *ngIf="colIdx === 0">
                                <div class="flex justify-center items-center" style="min-width: 2.5rem; min-height: 4rem;">
                                  <button
                                    *ngIf="seatNum !== null"
                                    [disabled]="!isSeatAvailable(seats[seatNum - 1])"
                                    [ngClass]="getSeatClasses(seats[seatNum - 1])"
                                    class="w-10 h-16 rounded flex flex-col items-center justify-center font-medium text-xs transition relative border"
                                    (click)="toggleSeatSelection(seats[seatNum - 1])"
                                    [title]="getSeatTooltip(seats[seatNum - 1])"
                                  >
                                    <span>{{ seats[seatNum - 1].number }}</span>
                                    <span class="text-[10px] mt-1">₹{{ bus.price }}</span>
                                    <div *ngIf="seats[seatNum - 1].gender" class="absolute top-0 right-0 w-3 h-3 rounded-full"
                                      [ngClass]="{
                                        'bg-blue-500': seats[seatNum - 1].gender === 'male',
                                        'bg-pink-500': seats[seatNum - 1].gender === 'female'
                                      }"></div>
                                    <div *ngIf="seats[seatNum - 1].type === 'ladies'"
                                      class="absolute -top-1 -right-1 bg-pink-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">
                                      L
                                    </div>
                                  </button>
                                </div>
                              </ng-container>
                            </ng-container>

                            <!-- Column 2 and 3 as nested grid with small gap -->
                            <div class="grid grid-cols-[min-content_min-content] gap-x-4">
                              <ng-container *ngFor="let seatNum of row; let colIdx = index">
                                <ng-container *ngIf="colIdx === 1 || colIdx === 2">
                                  <div class="flex justify-center items-center" style="min-width: 2.5rem; min-height: 4rem;">
                                    <button
                                      *ngIf="seatNum !== null"
                                      [disabled]="!isSeatAvailable(seats[seatNum - 1])"
                                      [ngClass]="getSeatClasses(seats[seatNum - 1])"
                                      class="w-10 h-16 rounded flex flex-col items-center justify-center font-medium text-xs transition relative border"
                                      (click)="toggleSeatSelection(seats[seatNum - 1])"
                                      [title]="getSeatTooltip(seats[seatNum - 1])"
                                    >
                                      <span>{{ seats[seatNum - 1].number }}</span>
                                      <span class="text-[10px] mt-1">₹{{ bus.price }}</span>
                                      <div *ngIf="seats[seatNum - 1].gender" class="absolute top-0 right-0 w-3 h-3 rounded-full"
                                        [ngClass]="{
                                          'bg-blue-500': seats[seatNum - 1].gender === 'male',
                                          'bg-pink-500': seats[seatNum - 1].gender === 'female'
                                        }"></div>
                                      <div *ngIf="seats[seatNum - 1].type === 'ladies'"
                                        class="absolute -top-1 -right-1 bg-pink-500 text-white text-[8px] rounded-full w-4 h-4 flex items-center justify-center">
                                        L
                                      </div>
                                    </button>
                                  </div>
                                </ng-container>
                              </ng-container>
                            </div>
                          </ng-container>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Boarding/Dropping Points -->
        <div *ngIf="currentStep === 2" class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Select Boarding & Dropping Points</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Boarding Points -->
              <div class="border rounded-lg p-4">
                <h3 class="font-medium text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Boarding Point
                </h3>
                <div class="space-y-3">
                  <div *ngFor="let point of boardingPoints" class="flex items-start">
                    <input 
                      type="radio" 
                      id="boarding-{{point.id}}" 
                      name="boardingPoint" 
                      [(ngModel)]="selectedBoardingPoint" 
                      [value]="point.id"
                      class="mt-1 h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                    >
                    <label for="boarding-{{point.id}}" class="ml-3 block text-sm text-gray-700">
                      <span class="font-medium">{{point.location}}</span>
                      <span class="block text-gray-500">{{point.time}} • {{point.landmark}}</span>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Dropping Points -->
              <div class="border rounded-lg p-4">
                <h3 class="font-medium text-gray-900 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Dropping Point
                </h3>
                <div class="space-y-3">
                  <div *ngFor="let point of droppingPoints" class="flex items-start">
                    <input 
                      type="radio" 
                      id="dropping-{{point.id}}" 
                      name="droppingPoint" 
                      [(ngModel)]="selectedDroppingPoint" 
                      [value]="point.id"
                      class="mt-1 h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                    >
                    <label for="dropping-{{point.id}}" class="ml-3 block text-sm text-gray-700">
                      <span class="font-medium">{{point.location}}</span>
                      <span class="block text-gray-500">{{point.time}} • {{point.landmark}}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 flex justify-between">
              <button 
                (click)="prevStep()"
                class="px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button 
                (click)="nextStep()"
                [disabled]="!selectedBoardingPoint || !selectedDroppingPoint"
                [ngClass]="{
                  'bg-red-600 hover:bg-red-700': selectedBoardingPoint && selectedDroppingPoint,
                  'bg-gray-300 cursor-not-allowed': !selectedBoardingPoint || !selectedDroppingPoint
                }"
                class="px-6 py-3 rounded-md text-white font-medium transition"
              >
                Continue to Passenger Details
              </button>
            </div>
          </div>
        </div>

        <!-- Step 3: Passenger Details -->
        <div *ngIf="currentStep === 3" class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-6">Passenger Details</h2>
            
            <div class="space-y-6">
              <div *ngFor="let seat of selectedSeats; let i = index" class="border-b pb-6">
                <h3 class="font-medium text-gray-900 mb-4">Passenger {{i + 1}} (Seat {{seat.number}})</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- For first passenger, show all fields -->
                  <ng-container *ngIf="i === 0; else otherPassengerFields">
                    <div>
                      <label for="name-{{i}}" class="block text-sm font-medium text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        id="name-{{i}}" 
                        [(ngModel)]="passengerDetails[i].name" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      >
                    </div>
                    <div>
                      <label for="age-{{i}}" class="block text-sm font-medium text-gray-700">Age</label>
                      <input 
                        type="number" 
                        id="age-{{i}}" 
                        [(ngModel)]="passengerDetails[i].age" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      >
                    </div>
                    <div>
                      <label for="gender-{{i}}" class="block text-sm font-medium text-gray-700">Gender</label>
                      <select 
                        id="gender-{{i}}" 
                        [(ngModel)]="passengerDetails[i].gender" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label for="mobile-{{i}}" class="block text-sm font-medium text-gray-700">Mobile Number</label>
                      <input 
                        type="tel" 
                        id="mobile-{{i}}" 
                        [(ngModel)]="passengerDetails[i].mobile" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      >
                    </div>
                  </ng-container>
                  <!-- For other passengers, only name and gender -->
                  <ng-template #otherPassengerFields>
                    <div>
                      <label for="name-{{i}}" class="block text-sm font-medium text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        id="name-{{i}}" 
                        [(ngModel)]="passengerDetails[i].name" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      >
                    </div>
                    <div>
                      <label for="gender-{{i}}" class="block text-sm font-medium text-gray-700">Gender</label>
                      <select 
                        id="gender-{{i}}" 
                        [(ngModel)]="passengerDetails[i].gender" 
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </ng-template>
                </div>
              </div>
            </div>

            <!-- Contact Details -->
            <div class="mt-8 border-t pt-6">
              <h3 class="font-medium text-gray-900 mb-4">Contact Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    [(ngModel)]="contactDetails.email" 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                </div>
                <div>
                  <label for="emergencyMobile" class="block text-sm font-medium text-gray-700">Emergency Mobile</label>
                  <input 
                    type="tel" 
                    id="emergencyMobile" 
                    [(ngModel)]="contactDetails.emergencyMobile" 
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  >
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="mt-8 flex justify-between">
              <button 
                (click)="prevStep()"
                class="px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Back
              </button>
              <button 
                (click)="submitBooking()"
                class="px-6 py-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-medium transition"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky Selected Seats Summary (Red Bus Style) -->
    <div *ngIf="currentStep === 1 && selectedSeats.length > 0" class="fixed bottom-0 left-0 right-0 bg-red-600 text-white shadow-lg z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex flex-col md:flex-row items-center justify-between">
        <!-- Action Buttons -->
            <div class="flex ">
              <button 
                (click)="goHome()"
                class="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-100 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </button>
            </div>
          <div class="flex items-center mb-2 md:mb-0 md:mr-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <span class="font-medium">Selected Seats:</span>
            <div class="ml-2 flex flex-wrap gap-1">
              <span *ngFor="let seat of selectedSeats" class="bg-white text-red-600 px-2 py-1 rounded text-xs font-bold">
                {{seat.number}}
              </span>
            </div>
          </div>
          
          <div class="flex items-center">

            <span class="font-medium mr-4">Total: ₹{{totalPrice}}</span>
            <button 
              (click)="nextStep()"
              class="px-6 py-2 rounded-md bg-white text-red-600 font-medium hover:bg-gray-100 transition"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    /* Adjust this if your navbar height changes */
    .stepper-fixed {
      position: fixed;
      top: 4rem; /* Navbar height */
      left: 0;
      width: 100%;
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.03);
    }
    .stepper-spacer {
      height: 4.5rem; /* Should match the height of .stepper-fixed */
    }
    `
  ]
})
export class SeatSelectionComponent {
  currentStep = 1;
  steps = ['Seat Selection', 'Boarding Points', 'Passenger Details'];
  currentGender: 'male' | 'female' = 'male';
  
  bus = {
    name: 'Sharma Travels AC Sleeper',
    rating: 4.5,
    reviews: 1243,
    price: 1200
  };

  // Updated seat layout with 3 columns and 5 rows for both lower and upper berth
  lowerBerthMap = [
    [1, null, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10, 11],
    [12, 13, 14]
  ];
  
  upperBerthMap = [
    [15, null, 16],
    [17, 18, 19],
    [20, 21, 22],
    [23, 24, 25],
    [26, 27, 28]
  ];

  seats = Array.from({ length: 28 }, (_, i) => {
    const seatNumber = i + 1;
    // Mark some seats as ladies seats (every 4th seat)
    const isLadiesSeat = seatNumber % 4 === 0;
    // Randomly book some seats (about 30% of seats)
    const isBooked = Math.random() < 0.3;
    const bookedGender = isBooked ? (Math.random() < 0.5 ? 'male' : 'female') : null;
    
    return {
      number: seatNumber,
      type: isLadiesSeat ? 'ladies' : 'normal',
      status: isBooked ? 'booked' : 'available',
      gender: bookedGender,
      adjacentSeats: this.getAdjacentSeats(seatNumber)
    };
  });

  selectedSeats: any[] = [];
  totalPrice = 0;
  restrictionMessage = '';

  boardingPoints = [
    { id: 1, location: 'Central Bus Station', time: '10:00 PM', landmark: 'Near City Mall' },
    { id: 2, location: 'Railway Station', time: '10:15 PM', landmark: 'Opposite Railway Gate' },
    { id: 3, location: 'Airport Road', time: '10:30 PM', landmark: 'Shell Petrol Pump' }
  ];

  droppingPoints = [
    { id: 1, location: 'Downtown Terminal', time: '6:00 AM', landmark: 'Near Clock Tower' },
    { id: 2, location: 'City Center', time: '6:15 AM', landmark: 'Opposite Metro Station' },
    { id: 3, location: 'Suburb Circle', time: '6:30 AM', landmark: 'Near Big Bazaar' }
  ];

  selectedBoardingPoint: number | null = null;
  selectedDroppingPoint: number | null = null;

  passengerDetails: any[] = [];
  contactDetails = {
    email: '',
    emergencyMobile: ''
  };

  constructor(private router: Router) {
    this.passengerDetails = this.selectedSeats.map(() => ({
      name: '',
      age: '',
      gender: 'male',
      mobile: ''
    }));
  }

  getAdjacentSeats(seatNumber: number): number[] {
    // Define adjacent seats for 3-column layout
    const adjacencyMap: {[key: number]: number[]} = {
      1: [2, 3],
      2: [1, 3, 4],
      3: [1, 2, 4, 5],
      4: [2, 3, 5, 6],
      5: [3, 4, 6, 7],
      6: [4, 5, 7, 8],
      7: [5, 6, 8, 9],
      8: [6, 7, 9, 10],
      9: [7, 8, 10, 11],
      10: [8, 9, 11, 12],
      11: [9, 10, 12, 13],
      12: [10, 11, 13, 14],
      13: [11, 12, 14],
      14: [12, 13],
      // Upper berth seats
      15: [16, 17],
      16: [15, 17, 18],
      17: [15, 16, 18, 19],
      18: [16, 17, 19, 20],
      19: [17, 18, 20, 21],
      20: [18, 19, 21, 22],
      21: [19, 20, 22, 23],
      22: [20, 21, 23, 24],
      23: [21, 22, 24, 25],
      24: [22, 23, 25, 26],
      25: [23, 24, 26, 27],
      26: [24, 25, 27, 28],
      27: [25, 26, 28],
      28: [26, 27]
    };
    
    return adjacencyMap[seatNumber] || [];
  }

  getSeatTooltip(seat: any): string {
    if (seat.status === 'booked') {
      return `Seat ${seat.number} is already booked`;
    }

    if (!this.isSeatAvailable(seat)) {
      if (seat.type === 'ladies' && this.currentGender !== 'female') {
        return 'This seat is for female passenger';
      }

      if (this.currentGender === 'male') {
        const adjacentFemaleSeats = seat.adjacentSeats
          .map((num: number) => this.seats.find(s => s.number === num))
          .filter((s: any) => s && s.gender === 'female');

        if (adjacentFemaleSeats.length > 0) {
          return `Cannot book seat ${seat.number} - adjacent to female passenger(s) in seat(s): ${adjacentFemaleSeats.map((s: any) => s.number).join(', ')}`;
        }
      }
      
      if (this.currentGender === 'female') {
        const adjacentMaleSeats = seat.adjacentSeats
          .map((num: number) => this.seats.find(s => s.number === num))
          .filter((s: any) => s && s.gender === 'male');

        if (adjacentMaleSeats.length > 0) {
          return `Cannot book seat ${seat.number} - adjacent to male passenger(s) in seat(s): ${adjacentMaleSeats.map((s: any) => s.number).join(', ')}`;
        }
      }

      if (seat.type === 'ladies') {
        return 'This seat is for female passenger';
      }
    }

    return `Seat ${seat.number} - ₹${this.bus.price}`;
  }

  isSeatAvailable(seat: any): boolean {
    if (seat.status === 'booked') return false;
    
    // Ladies seats can only be booked by females
    if (seat.type === 'ladies' && this.currentGender !== 'female') return false;
    
    // Check adjacent seats for gender restrictions
    if (this.currentGender === 'male') {
      // For male passengers, check if any adjacent seat is booked by female
      const hasAdjacentFemale = seat.adjacentSeats.some((adjSeatNum: number) => {
        const adjSeat = this.seats.find(s => s.number === adjSeatNum);
        return adjSeat && adjSeat.gender === 'female';
      });
      
      if (hasAdjacentFemale) return false;
    }
    
    if (this.currentGender === 'female') {
      // For female passengers, check if any adjacent seat is booked by male
      const hasAdjacentMale = seat.adjacentSeats.some((adjSeatNum: number) => {
        const adjSeat = this.seats.find(s => s.number === adjSeatNum);
        return adjSeat && adjSeat.gender === 'male';
      });
      
      if (hasAdjacentMale) return false;
    }
    
    return true;
  }

  setCurrentGender(gender: 'male' | 'female') {
    this.currentGender = gender;
    this.restrictionMessage = '';
  }

  getSeatClasses(seat: any) {
    const isAvailable = this.isSeatAvailable(seat);
    const classes: { [key: string]: boolean } = {
      'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300': seat.status === 'booked',
      'bg-green-100 text-green-800 border-2 border-green-400': seat.status === 'selected',
      'bg-white text-gray-800 border-2 border-gray-400 hover:bg-gray-50': seat.status === 'available' && isAvailable,
      'bg-pink-100 text-pink-800 border-2 border-pink-400': seat.type === 'ladies' && seat.status !== 'booked',
      'bg-red-100 text-red-800 border-2 border-red-400': seat.status === 'available' && !isAvailable,
      // Add gender-specific classes only for booked seats
      'bg-blue-100': seat.status === 'booked' && seat.gender === 'male',
      'border-blue-300': seat.status === 'booked' && seat.gender === 'male',
      'bg-pink-100': seat.status === 'booked' && seat.gender === 'female',
      'border-pink-300': seat.status === 'booked' && seat.gender === 'female',
    };
    return classes;
  }

  toggleSeatSelection(seat: any) {
    if (seat.status === 'booked' || !this.isSeatAvailable(seat)) {
      return;
    }

    if (seat.status === 'available') {
      seat.status = 'selected';
      seat.gender = this.currentGender;
      this.selectedSeats.push(seat);
    } else {
      seat.status = 'available';
      seat.gender = null;
      this.selectedSeats = this.selectedSeats.filter(s => s.number !== seat.number);
    }

    this.totalPrice = this.selectedSeats.length * this.bus.price;
    this.passengerDetails = this.selectedSeats.map(() => ({
      name: '',
      age: '',
      gender: this.currentGender,
      mobile: ''
    }));
  }

  goHome() {
    this.router.navigate(['/']);
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitBooking() {
    const bookingData = {
      bus: this.bus,
      seats: this.selectedSeats,
      boardingPoint: this.boardingPoints.find(p => p.id === this.selectedBoardingPoint),
      droppingPoint: this.droppingPoints.find(p => p.id === this.selectedDroppingPoint),
      passengers: this.passengerDetails,
      contact: this.contactDetails,
      totalPrice: this.totalPrice
    };

    console.log('Booking submitted:', bookingData);
    // In real app: this.router.navigate(['/payment'], { state: { booking: bookingData } });
  }
}