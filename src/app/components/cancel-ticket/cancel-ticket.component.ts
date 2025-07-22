// cancel-ticket.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cancel-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cancel-ticket.component.html',
  styleUrls: ['./cancel-ticket.component.css']
})
export class CancelTicketComponent {
  ticketId: string = '';
  passengerName: string = '';
  bookingDetails: any = null;
  isLoading: boolean = false;
  cancellationSuccess: boolean = false;
  cancellationFee: number = 100;
  refundAmount: number = 0;
  selectedSeats: string[] = [];
  cancelOption: 'all' | 'partial' = 'all'; // New property for cancel option

  // Sample database of booked tickets
  private ticketDatabase = [
    {
      ticketId: 'TN123456',
      passengerName: 'John Doe',
      journeyDate: '2023-12-15',
      busNumber: 'TN 01 AB 1234',
      seats: ['A1', 'B2','C3'],
      totalFare: 1200,
      boardingPoint: 'Chennai Central',
      droppingPoint: 'Bangalore Majestic',
      bookingDate: '2023-12-10'
    },
    {
      ticketId: 'TN654321',
      passengerName: 'Jane Smith',
      journeyDate: '2023-12-16',
      busNumber: 'TN 02 CD 5678',
      seats: ['C3'],
      totalFare: 600,
      boardingPoint: 'Chennai Central',
      droppingPoint: 'Bangalore Majestic',
      bookingDate: '2023-12-11'
    }
  ];

  constructor(private route: ActivatedRoute) {
    // Read ticket id from route param if present
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.ticketId = id;
      }
    });
  }

  searchTicket() {
    if (!this.ticketId || !this.passengerName) return;

    this.isLoading = true;
    
    // Simulate API call with delay
    setTimeout(() => {
      const foundTicket = this.ticketDatabase.find(ticket => 
        ticket.ticketId === this.ticketId && 
        ticket.passengerName.toLowerCase() === this.passengerName.toLowerCase()
      );

      if (foundTicket) {
        this.bookingDetails = { ...foundTicket };
        this.selectedSeats = [...foundTicket.seats]; // Auto-select all booked seats
        this.calculateRefund();
      } else {
        alert('No ticket found with the provided details');
      }

      this.isLoading = false;
    }, 1000);
  }

  calculateRefund() {
    if (this.cancelOption === 'all') {
      this.refundAmount = this.bookingDetails.totalFare - this.cancellationFee;
    } else {
      // Calculate partial refund based on number of seats being cancelled
      const seatPrice = this.bookingDetails.totalFare / this.bookingDetails.seats.length;
      this.refundAmount = (this.selectedSeats.length * seatPrice) - this.cancellationFee;
      if (this.refundAmount < 0) this.refundAmount = 0;
    }
  }

  toggleSeatSelection(seat: string) {
    const index = this.selectedSeats.indexOf(seat);
    if (index === -1) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats.splice(index, 1);
    }
    this.calculateRefund();
  }

  toggleCancelOption(option: 'all' | 'partial') {
    this.cancelOption = option;
    if (option === 'all') {
      this.selectedSeats = [...this.bookingDetails.seats];
    } else {
      // Keep current selection or empty if switching from 'all'
      if (this.selectedSeats.length === this.bookingDetails.seats.length) {
        this.selectedSeats = [];
      }
    }
    this.calculateRefund();
  }

  cancelTicket() {
    if (this.cancelOption === 'partial' && this.selectedSeats.length === 0) {
      alert('Please select at least one seat to cancel');
      return;
    }

    this.isLoading = true;
    
    // Simulate cancellation API call
    setTimeout(() => {
      // In a real app, you would update the backend here
      this.cancellationSuccess = true;
      this.isLoading = false;
      
      // Update the "database" - removing cancelled seats
      const ticketIndex = this.ticketDatabase.findIndex(t => t.ticketId === this.bookingDetails.ticketId);
      if (ticketIndex !== -1) {
        if (this.cancelOption === 'all') {
          this.ticketDatabase.splice(ticketIndex, 1); // Remove the entire ticket
        } else {
          // Remove only selected seats from the booking
          const remainingSeats = this.ticketDatabase[ticketIndex].seats.filter(
            (seat: string) => !this.selectedSeats.includes(seat)
          );
          
          if (remainingSeats.length === 0) {
            this.ticketDatabase.splice(ticketIndex, 1); // Remove ticket if no seats left
          } else {
            // Update fare proportionally
            const seatPrice = this.ticketDatabase[ticketIndex].totalFare / 
                             this.ticketDatabase[ticketIndex].seats.length;
            this.ticketDatabase[ticketIndex].seats = remainingSeats;
            this.ticketDatabase[ticketIndex].totalFare = remainingSeats.length * seatPrice;
          }
        }
      }
    }, 1500);
  }

  resetSearch() {
    this.bookingDetails = null;
    this.selectedSeats = [];
    this.ticketId = '';
    this.passengerName = '';
    this.cancelOption = 'all';
  }
  goHome() {
    window.location.href = '/';
  }
}