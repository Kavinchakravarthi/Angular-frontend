import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-bus-results',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent],
  template: `
    <!-- Main Container -->
    <div class="bg-gray-50 min-h-screen pb-12">
      <!-- Remove duplicate navbar -->
      <!-- Search Filters -->
      <div class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div class="mb-4">
            <button (click)="goHome()" class="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 font-medium bg-white hover:bg-gray-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
          </div>
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <!-- Route Info -->
            <div class="flex items-center">
              <div class="text-center">
                <div class="text-lg font-bold text-gray-900">{{source}}</div>
                <div class="text-xs text-gray-500">{{departureDate | date:'shortDate'}}</div>
              </div>
              <div class="mx-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <div class="text-center">
                <div class="text-lg font-bold text-gray-900">{{destination}}</div>
                <div class="text-xs text-gray-500">Return: {{returnDate | date:'shortDate'}}</div>
              </div>
            </div>

            <!-- Filters -->
            <div class="flex items-center space-x-4">
              <select [(ngModel)]="sortBy" class="border border-gray-300 rounded-md px-3 py-2 focus:ring-red-500 focus:border-red-500">
                <option value="departure">Departure Time</option>
                <option value="arrival">Arrival Time</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
              <button (click)="applyFilters()" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Container -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Bus List -->
        <div class="space-y-6">
          <!-- Bus Card -->
          <div *ngFor="let bus of filteredBuses" class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
            <div class="p-6">
              <div class="flex flex-col md:flex-row justify-between">
                <!-- Left Side - Bus Info -->
                <div class="flex-1">
                  <div class="flex items-start">
                    <img [src]="bus.image" alt="Bus image" class="h-16 w-16 object-contain mr-4">
                    <div>
                      <h3 class="text-xl font-bold text-gray-900">{{bus.name}}</h3>
                      <div class="flex items-center mt-1">
                        <div class="flex text-yellow-400">
                          <span *ngFor="let star of [1,2,3,4,5]">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" [class.text-yellow-400]="star <= bus.rating" [class.text-gray-300]="star > bus.rating" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                        </div>
                        <span class="ml-2 text-sm text-gray-600">{{bus.rating}} ({{bus.reviews}} reviews)</span>
                      </div>
                      <div class="mt-2 flex items-center text-sm text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{bus.duration}} • {{bus.type}}
                      </div>
                      <div class="mt-2">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {{bus.amenities[0]}}
                        </span>
                        <span *ngIf="bus.amenities.length > 1" class="ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {{bus.amenities[1]}}
                        </span>
                      </div>
                      <button (click)="viewProductShowcase(bus)" class="mt-4 bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md font-medium transition">View Buses</button>
                    </div>
                  </div>
                </div>

                <!-- Right Side - Timing and Price -->
                <div class="mt-4 md:mt-0 flex flex-col items-end">
                  <div class="text-right">
                    <div class="text-2xl font-bold text-red-600">₹{{bus.price}}</div>
                    <div class="text-sm text-gray-500">per seat</div>
                  </div>
                  <div class="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div class="text-sm text-gray-500">Departure</div>
                      <div class="font-medium">{{bus.departureTime}}</div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">Arrival</div>
                      <div class="font-medium">{{bus.arrivalTime}}</div>
                    </div>
                  </div>
                  <button 
                    (click)="viewSeats(bus)"
                    class="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition"
                  >
                    View Seats
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Results -->
        <div *ngIf="filteredBuses.length === 0" class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
          </svg>
          <h3 class="mt-2 text-lg font-medium text-gray-900">No buses found</h3>
          <p class="mt-1 text-gray-500">Try adjusting your search or filters</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BusResultsComponent implements OnInit {
  source: string = '';
  destination: string = '';
  departureDate: Date = new Date();
  returnDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  sortBy: string = 'departure';
  
  buses = [
    {
      id: 1,
      name: 'Sharma Travels AC Sleeper',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 4.5,
      reviews: 1243,
      departureTime: '22:30',
      arrivalTime: '06:45',
      duration: '8h 15m',
      price: 1200,
      type: 'AC Sleeper',
      amenities: ['AC', 'Charging Point'],
      seatsAvailable: 12
    },
    {
      id: 2,
      name: 'Patel Tours Non-AC Seater',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 3.8,
      reviews: 876,
      departureTime: '23:15',
      arrivalTime: '07:30',
      duration: '8h 15m',
      price: 850,
      type: 'Non-AC Seater',
      amenities: ['Water Bottle', 'Blanket'],
      seatsAvailable: 5
    },
    {
      id: 3,
      name: 'Royal Cruiser AC Multi-Axle',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 4.7,
      reviews: 2543,
      departureTime: '21:00',
      arrivalTime: '05:15',
      duration: '8h 15m',
      price: 1500,
      type: 'AC Multi-Axle',
      amenities: ['AC', 'WiFi', 'TV'],
      seatsAvailable: 18
    }
  ];

  filteredBuses = [...this.buses];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.source = params['from'] || '';
      this.destination = params['to'] || '';
      this.departureDate = params['date'] ? new Date(params['date']) : new Date();
      this.returnDate = params['returnDate'] ? new Date(params['returnDate']) : 
        new Date(new Date().setDate(new Date().getDate() + 1));
    });
  }

  applyFilters() {
    // In a real app, this would call an API with filters
    this.filteredBuses = [...this.buses].sort((a, b) => {
      if (this.sortBy === 'departure') {
        return a.departureTime.localeCompare(b.departureTime);
      } else if (this.sortBy === 'arrival') {
        return a.arrivalTime.localeCompare(b.arrivalTime);
      } else if (this.sortBy === 'price') {
        return a.price - b.price;
      } else {
        return b.rating - a.rating;
      }
    });
  }

  viewSeats(bus: any) {
    this.router.navigate(['/seats'], { queryParams: { busId: bus.id } });
  }

  viewProductShowcase(bus: any) {
    this.router.navigate(['/product-showcase'], { queryParams: { busId: bus.id } });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}