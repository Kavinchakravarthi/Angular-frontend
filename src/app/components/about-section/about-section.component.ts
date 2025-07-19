import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span class="block">Our Travel Experience</span>
            <span class="block text-red-500">What Makes Us Special</span>
          </h2>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            We're not just a booking platform - we're your travel partners on the road.
          </p>
        </div>

        <!-- Feature Grid -->
        <div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          <!-- Feature 1 -->
          <div class="pt-6">
            <div class="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow-lg hover:shadow-xl transition duration-300">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-red-400 text-white mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <h3 class="mt-8 text-lg font-medium text-gray-900 text-center">Easy Booking</h3>
                <p class="mt-5 text-base text-gray-500">
                  Our platform makes booking your bus tickets as easy as 1-2-3. No hassle, no confusion - just quick and secure bookings.
                </p>
              </div>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="pt-6">
            <div class="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow-lg hover:shadow-xl transition duration-300">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-red-400 text-white mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="mt-8 text-lg font-medium text-gray-900 text-center">Best Prices</h3>
                <p class="mt-5 text-base text-gray-500">
                  We partner with hundreds of bus operators to bring you the best prices. No hidden charges, just transparent pricing.
                </p>
              </div>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="pt-6">
            <div class="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow-lg hover:shadow-xl transition duration-300">
              <div class="-mt-6">
                <div class="flex items-center justify-center h-12 w-12 rounded-md bg-red-400 text-white  mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 class="mt-8 text-lg font-medium text-gray-900 text-center">Safe Travel</h3>
                <p class="mt-5 text-base text-gray-500">
                  Your safety is our priority. All our partner buses maintain high safety standards and regular sanitization protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Feature Grid ends here -->
      </div>
    </section>
  `,
  styles: []
})
export class AboutSectionComponent {}