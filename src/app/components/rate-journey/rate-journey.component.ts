import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rate-journey',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rate-journey.component.html',
  styleUrls: ['./rate-journey.component.css']
})
export class RateJourneyComponent {
  currentRating = 0;
  feedback = '';
  showAlert = false;
  selectedBooking: any = {
    from: '',
    to: '',
    busName: '',
    date: ''
  };

  constructor(private router: Router) {
    // Get booking data from navigation state
    const nav = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state && nav.extras.state['booking']) {
      this.selectedBooking = nav.extras.state['booking'];
    }
  }

  goHome() {
    this.showAlert = false;
    this.router.navigate(['/']);
  }

  setRating(rating: number) {
    this.currentRating = rating;
  }

  submitRating() {
    // Handle rating submission logic here
    this.showAlert = true;
    // Optionally, auto-close after a delay:
    // setTimeout(() => this.goHome(), 2000);
  }
}