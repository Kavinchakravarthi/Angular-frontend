import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AboutSectionComponent } from '../about-section/about-section.component';

@Component({
  selector: 'app-home-section',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AboutSectionComponent],
  template: `
    <section class="bg-white py-30 sm:py-22 lg:py-12 px-4">
      <div class="max-w-6xl mx-auto">
        <!-- Search Container with gradient border -->
        <div class="search-sticky bg-white rounded-lg shadow-lg p-3 sm:p-6 border-1 border-transparent bg-clip-padding "
             style="border-image: linear-gradient(65deg,rgb(204, 255, 0),rgb(255, 0, 0)) 1; z-index: 40;">
          <div class="flex flex-col md:flex-row gap-2 sm:gap-1">
            <!-- Source Input -->
            <div class="flex-1">
              <label for="source" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">From</label>
              <div class="relative">
                <input 
                  type="text" 
                  id="source" 
                  [(ngModel)]="source" 
                  placeholder="Enter source city" 
                  class="w-full px-3 py-1.5 sm:py-3 text-xs sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-red-500 focus:border-red-400 outline-none transition"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-5 sm:w-5 text-gray-400 absolute right-2 top-2 sm:right-3 sm:top-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <!-- Destination Input -->
            <div class="flex-1">
              <label for="destination" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">To</label>
              <div class="relative">
                <input 
                  type="text" 
                  id="destination" 
                  [(ngModel)]="destination" 
                  placeholder="Enter destination city" 
                  class="w-full px-3 py-1.5 sm:py-3 text-xs sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-500 outline-none transition"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 sm:h-5 sm:w-5 text-gray-400 absolute right-2 top-2 sm:right-3 sm:top-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>

            <!-- Date Picker -->
            <div class="flex-1">
              <label for="date" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" 
                id="date" 
                [(ngModel)]="travelDate" 
                class="w-full px-3 py-1.5 sm:py-3 text-xs sm:text-base border border-gray-300 rounded-md focus:ring-1 focus:ring-red-400 focus:border-red-500 outline-none transition"
              >
            </div>

            <!-- Search Button -->
            <div class="flex items-end">
              <button 
                (click)="searchBuses()" 
                class="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-6 py-1.5 sm:py-3 text-xs sm:text-base rounded-md font-medium transition duration-300 w-full h-[34px] sm:h-[46px]"
              >
                Search Buses
              </button>
            </div>
          </div>
        </div>
        <div class="search-sticky-spacer"></div>

        <!-- Hero Carousel -->
        <div class="mt-1 rounded-lg overflow-hidden shadow-lg relative">
          <div class="relative h-48 sm:h-66 overflow-hidden">
            <!-- Carousel slides -->
            <div *ngFor="let image of carouselImages; let i = index" 
                 [class.block]="currentSlide === i" 
                 [class.hidden]="currentSlide !== i"
                 class="w-full h-48 sm:h-66 transition-opacity duration-1000">
              <img 
                [src]="image" 
                alt="Bus travel" 
                class="w-full h-48 sm:h-66 object-cover"
              >
            </div>
            
            <!-- Carousel indicators -->
            <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              <button *ngFor="let image of carouselImages; let i = index" 
                      (click)="goToSlide(i)"
                      [class]="currentSlide === i ? 'w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-600' : 'w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white bg-opacity-50'"
                      aria-label="Go to slide">
              </button>
            </div>
          </div>
        </div>

        <!-- Popular Routes -->
        <div class="mt-8 sm:mt-12 relative">
          <h2 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Popular Bus Routes</h2>
          <div class="overflow-x-auto scrollbar-hide flex items-center">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full" style="transition: transform 0.4s;">
              <ng-container *ngFor="let route of visiblePopularRoutes">
                <div class="popular-route-box bg-white p-3 sm:p-4 rounded-lg border border-gray-200 hover:shadow-md transition flex items-center">
                  <div class="flex items-center flex-1">
                    <div class="bg-red-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-medium text-sm sm:text-base text-gray-800">{{route.from}} to {{route.to}}</h3>
                      <p class="text-xs sm:text-sm text-gray-500">{{route.buses}} buses available</p>
                    </div>
                  </div>
                </div>
              </ng-container>
            </div>
            <button (click)="nextPopularRoutes()" class="ml-2 sm:ml-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
    <app-about-section></app-about-section>

    <!-- Scroll to top button -->
    <button 
      *ngIf="showScrollButton"
      (click)="scrollToTop()"
      class="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50"
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  `,
  styles: [
    `
    .popular-route-box {
      min-width: 0;
      max-width: 100%;
      min-height: 80px;
      height: 100%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
    }
    @media (min-width: 640px) {
      .popular-route-box {
        min-height: 96px;
      }
    }
    .search-sticky {
      position: fixed;
      top: 3.5rem;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
      width: calc(100% - 2rem);
      max-width: 96rem;
      z-index: 40;
    }
    .search-sticky-spacer {
      height: 5.5rem;
    }
    @media (min-width: 640px) {
      .search-sticky {
        top: 4rem;
        padding: 1.5rem;
         width: calc(100% - 0rem);
      max-width: 96rem;
      }
      @media query (min-width: 720px) {
      .search-sticky {
        top: 0rem;
        padding: 1.5rem;
         width: calc(100% - 0rem);
      max-width: 96rem;
      }
  }
      .search-sticky-spacer {
        height: 7.5rem;
      }
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
  showScrollButton = false;

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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 200;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
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