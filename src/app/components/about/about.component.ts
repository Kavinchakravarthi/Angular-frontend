import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  founders = [
    {
      name: 'Phanindra Sama',
      role: 'Co-Founder & Former CEO',
      image: '/assets/Images/bus33.jpg',
      bio: 'Visionary entrepreneur who pioneered online bus ticketing in India. Founded redBus in 2006 and led it to become India\'s largest bus ticketing platform.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Sudhakar Pasupunuri',
      role: 'Co-Founder & CTO',
      image: '/assets/Images/bus35.jpg',
      bio: 'Technology architect behind redBus platform. Built the robust systems that scaled to handle millions of bookings.',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  milestones = [
    { year: '2006', event: 'Founded in Bangalore with a mission to simplify bus travel' },
    { year: '2008', event: 'Expanded operations to major Indian cities' },
    { year: '2013', event: 'Acquired by ibibo Group (Naspers)' },
    { year: '2018', event: 'Crossed 20 million tickets annually' },
    { year: '2023', event: 'Serving customers across 100,000+ routes' }
  ];

  stats = [
    { value: '20M+', label: 'Tickets annually', icon: 'ticket' },
    { value: '2,500+', label: 'Bus operators', icon: 'bus' },
    { value: '100K+', label: 'Routes covered', icon: 'map' },
    { value: '10M+', label: 'Happy customers', icon: 'user-group' }
  ];
}