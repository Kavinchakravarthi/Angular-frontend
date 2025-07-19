import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offers-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offers-page.component.html',
  styleUrls: ['./offers-page.component.css']
})
export class OffersPageComponent {
  // Categories for filtering
  categories = [
    { id: 'all', name: 'All Offers' },
    { id: 'bus', name: 'Bus Tickets' },
    { id: 'student', name: 'Student Offers' },
    { id: 'weekend', name: 'Weekend offers' }
  ];
  
  selectedCategory = 'all';
  
  // Real-time offers data
  offers = [
    {
      id: 1,
      title: "FLAT 15% OFF",
      code: "REDBUS15",
      description: "Get 15% instant discount on bus tickets",
      validUntil: "2023-12-31",
      minAmount: 1000,
      discountType: "percentage",
      discountValue: 15,
      category: "bus",
      isActive: true,
      image: "assets/Images/bus3.jpg",
      terms: ["Valid on minimum booking of ₹1000", "Applicable on all routes", "Max discount ₹500"]
    },
    {
      id: 3,
      title: "WEEKEND SPECIAL",
      code: "WEEKEND20",
      description: "20% discount on weekend travels",
      validUntil: "2023-12-17",
      minAmount: 800,
      discountType: "percentage",
      discountValue: 20,
      category: "weekend",
      isActive: true,
      image: "/assets/Images/bus1.jpg",
      terms: ["Valid only on Friday to Sunday bookings", "Applicable on select routes"]
    },
    {
      id: 4,
      title: "FIRST BUS FREE",
      code: "NEWUSER",
      description: "New users get 100% discount (max ₹300)",
      validUntil: "2024-01-15",
      minAmount: 0,
      discountType: "fixed",
      discountValue: 300,
      category: "bus",
      isActive: true,
      image: "/assets/Images/bus-20.jpg",
      terms: ["Only for first-time users", "Valid ID proof required"]
    },
    

    {
      id: 7,
      title: "STUDENT SPECIAL",
      code: "STUDENT25",
      description: "25% off for students on all routes",
      validUntil: "2024-02-28",
      minAmount: 500,
      discountType: "percentage",
      discountValue: 25,
      category: "student",
      isActive: true,
      image: "assets/Images/bus13.jpg",
      terms: ["Valid student ID required", "Max discount ₹750"]
    },

  ];

  get filteredOffers() {
    if (this.selectedCategory === 'all') return this.offers;
    return this.offers.filter(offer => offer.category === this.selectedCategory);
  }

  getRemainingDays(validUntil: string): number {
    const today = new Date();
    const validDate = new Date(validUntil);
    const diffTime = validDate.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  }

   goHome() {
    window.location.href = '/';
  }

  copyToClipboard(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      // You can replace this with a toast notification if preferred
      console.log('Copied to clipboard:', code);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }
}