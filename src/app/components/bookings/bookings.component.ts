import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

interface Booking {
  id: string;
  date: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  busName: string;
  busType: string;
  seats: string[];
  boardingPoint: string;
  droppingPoint: string;
  fare: number;
  status: string;
  amenities: string[];
  rating?: number;
  feedback?: string;
}

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [DatePipe]
})
export class BookingsComponent {
  // Navigate to rate-journey component with booking data
  rateJourney(booking: Booking) {
    this.router.navigate(['/rate-journey'], { state: { booking } });
  }
  activeTab: 'upcoming' | 'completed' | 'cancelled' = 'upcoming';
  showCancelModal: boolean = false;
  showRatingModal: boolean = false;
  currentRating: number = 0;
  feedback: string = '';
  selectedBooking: Booking | null = null;

  bookings: {
    [key: string]: Booking[];
    upcoming: Booking[];
    completed: Booking[];
    cancelled: Booking[];
  } = {
    upcoming: [
      {
        id: 'RB12345678',
        date: '2023-12-15',
        from: 'Bangalore',
        to: 'Chennai',
        departure: '22:30',
        arrival: '06:00',
        busName: 'SRS Travels',
        busType: 'AC Sleeper (2+1)',
        seats: ['L1', 'L2'],
        boardingPoint: 'Madiwala, Bangalore',
        droppingPoint: 'Koyambedu, Chennai',
        fare: 1200,
        status: 'Confirmed',
        amenities: ['AC', 'Charging Point', 'Water Bottle', 'Blanket']
      },
      {
        id: 'RB87654321',
        date: '2023-12-20',
        from: 'Mumbai',
        to: 'Pune',
        departure: '08:00',
        arrival: '12:30',
        busName: 'VRL Travels',
        busType: 'AC Seater (2+2)',
        seats: ['U5'],
        boardingPoint: 'Dadar, Mumbai',
        droppingPoint: 'Wakad, Pune',
        fare: 650,
        status: 'Confirmed',
        amenities: ['AC', 'TV', 'Water Bottle']
      }
    ],
    completed: [
      {
        id: 'RB98765432',
        date: '2023-11-25',
        from: 'Hyderabad',
        to: 'Bangalore',
        departure: '23:00',
        arrival: '07:30',
        busName: 'Orange Travels',
        busType: 'AC Sleeper (2+1)',
        seats: ['U3'],
        boardingPoint: 'Jubilee Bus Stand, Hyderabad',
        droppingPoint: 'Electronic City, Bangalore',
        fare: 1100,
        status: 'Completed',
        amenities: ['AC', 'Blanket', 'Water Bottle']
      }
    ],
    cancelled: []
  };

  constructor(private datePipe: DatePipe, private router: Router) {}
  cancelTicket(booking: Booking) {
    // Navigate to the cancel ticket component with the booking id as a route parameter
    this.router.navigate(['/cancel-ticket', booking.id]);
  }

  formatDate(date: string, format: string = 'mediumDate'): string {
    return this.datePipe.transform(date, format) || '';
  }

  cancelBooking() {
    if (this.selectedBooking) {
      const index = this.bookings.upcoming.findIndex(b => b.id === this.selectedBooking?.id);
      if (index !== -1) {
        const cancelledBooking = {...this.bookings.upcoming[index], status: 'Cancelled'};
        this.bookings.cancelled.push(cancelledBooking);
        this.bookings.upcoming.splice(index, 1);
      }
      this.showCancelModal = false;
      this.selectedBooking = null;
      this.activeTab = 'cancelled';
    }
  }

  openCancelModal(booking: Booking) {
    this.selectedBooking = booking;
    this.showCancelModal = true;
  }

  openRatingModal(booking: Booking) {
    this.selectedBooking = booking;
    this.currentRating = booking.rating || 0;
    this.feedback = booking.feedback || '';
    this.showRatingModal = true;
  }

  setRating(rating: number) {
    this.currentRating = rating;
  }

  submitRating() {
    if (this.selectedBooking) {
      const index = this.bookings.completed.findIndex(b => b.id === this.selectedBooking?.id);
      if (index !== -1) {
        this.bookings.completed[index].rating = this.currentRating;
        this.bookings.completed[index].feedback = this.feedback;
      }
      this.showRatingModal = false;
      this.selectedBooking = null;
      this.currentRating = 0;
      this.feedback = '';
    }
  }
}