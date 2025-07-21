import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AboutSectionComponent } from '../about-section/about-section.component';

@Component({
  selector: 'app-home-section',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AboutSectionComponent],
  template: `
    <section class="bg-white py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Search Container with gradient border -->
        <div class="search-sticky bg-white rounded-lg shadow-lg p-6 border-1 border-transparent bg-clip-padding "
             style="border-image: linear-gradient(65deg,rgb(204, 255, 0),rgb(255, 0, 0)) 1; z-index: 40;">
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Source Input -->
            <div class="flex-1">
              <label for="source" class="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div class="relative">
                <input 
                  type="text" 
                  id="source" 
                  [(ngModel)]="source" 
                  placeholder="Enter source city" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-400 outline-none transition"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute right-3 top-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <!-- Destination Input -->
            <div class="flex-1">
              <label for="destination" class="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div class="relative">
                <input 
                  type="text" 
                  id="destination" 
                  [(ngModel)]="destination" 
                  placeholder="Enter destination city" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-500 outline-none transition"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 absolute right-3 top-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <!-- Date Picker -->
            <div class="flex-1">
              <label for="date" class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" 
                id="date" 
                [(ngModel)]="travelDate" 
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-500 outline-none transition"
              >
            </div>

            <!-- Search Button -->
            <div class="flex items-end">
              <button 
                (click)="searchBuses()" 
                class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition duration-300 w-full h-[46px]"
              >
                Search Buses
              </button>
            </div>
          </div>
        </div>
        <div class="search-sticky-spacer"></div>

        <!-- Hero Carousel -->
        <div class="mt-1 rounded-lg overflow-hidden shadow-lg relative">
          <div class="relative h-66 overflow-hidden">
            <!-- Carousel slides -->
            <div *ngFor="let image of carouselImages; let i = index" 
                 [class.block]="currentSlide === i" 
                 [class.hidden]="currentSlide !== i"
                 class="w-full h-66 transition-opacity duration-1000">
              <img 
                [src]="image" 
                alt="Bus travel" 
                class="w-full h-66 object-cover"
              >
            </div>
            
            <!-- Carousel indicators -->
            <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              <button *ngFor="let image of carouselImages; let i = index" 
                      (click)="goToSlide(i)"
                      [class]="currentSlide === i ? 'w-3 h-3 rounded-full bg-red-600' : 'w-3 h-3 rounded-full bg-white bg-opacity-50'"
                      aria-label="Go to slide">
              </button>
            </div>
          </div>
        </div>

        <!-- Popular Routes -->
        <div class="mt-12 relative">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Popular Bus Routes</h2>
          <div class="overflow-x-auto scrollbar-hide flex items-center">
            <div class="grid grid-cols-4 gap-4 w-full" style="transition: transform 0.4s;">
              <ng-container *ngFor="let route of visiblePopularRoutes">
                <div class="popular-route-box bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition flex items-center">
                  <div class="flex items-center flex-1">
                    <div class="bg-red-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-800">{{route.from}} to {{route.to}}</h3>
                      <p class="text-sm text-gray-500">{{route.buses}} buses available</p>
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
            <button (click)="nextPopularRoutes()" class="ml-4 w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
    <app-about-section></app-about-section>
  `,
  styles: [
    `
    .popular-route-box {
      min-width: 0;
      max-width: 100%;
      min-height: 96px;
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
    .search-sticky {
      position: fixed;
      top: 4rem; /* below navbar, adjust if navbar height changes */
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      max-width: 96rem; /* matches max-w-6xl */
      z-index: 40;
    }
    .search-sticky-spacer {
      height: 7.5rem; /* matches the height of the search container, adjust as needed */
    }
    `
  ]
})
export class HomeSectionComponent implements OnInit, OnDestroy {
  source: string = '';
  destination: string = '';
  travelDate: string = new Date().toISOString().split('T')[0];
  currentSlide = 0;
  carouselInterval: any;

  // Carousel images (all similar size/theme)
  carouselImages = [
    '/assets/Images/bus26.png',
    '/assets/Images/bus27.png',
    '/assets/Images/bus30.png'
  ];

  allPopularRoutes = [
    [
      { from: 'Bangalore', to: 'Chennai', buses: 45 },
      { from: 'Mumbai', to: 'Pune', buses: 62 },
      { from: 'Delhi', to: 'Jaipur', buses: 38 },
      { from: 'Hyderabad', to: 'Vijayawada', buses: 27 }
    ],
    [
      { from: 'Ahmedabad', to: 'Surat', buses: 33 },
      { from: 'Kolkata', to: 'Durgapur', buses: 21 },
      { from: 'Chandigarh', to: 'Manali', buses: 18 },
      { from: 'Goa', to: 'Mumbai', buses: 29 }
    ],
    [
      { from: 'Lucknow', to: 'Kanpur', buses: 40 },
      { from: 'Bhopal', to: 'Indore', buses: 25 },
      { from: 'Nagpur', to: 'Raipur', buses: 19 },
      { from: 'Patna', to: 'Gaya', buses: 15 }
    ]
  ];
  popularRoutes = this.allPopularRoutes[0];
  visiblePopularRoutes = this.popularRoutes;
  currentPopularIndex = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    // Reset timer when user manually changes slide
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    this.startCarousel();
  }

  searchBuses() {
    this.router.navigate(['/results'], { 
      queryParams: { 
        from: this.source,
        to: this.destination,
        date: this.travelDate
      }
    });
  }

  nextPopularRoutes() {
    this.currentPopularIndex = (this.currentPopularIndex + 1) % this.allPopularRoutes.length;
    this.popularRoutes = this.allPopularRoutes[this.currentPopularIndex];
    this.visiblePopularRoutes = this.popularRoutes;
  }
}