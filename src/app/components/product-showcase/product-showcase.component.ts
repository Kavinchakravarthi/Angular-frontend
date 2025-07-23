import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-scroll-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-showcase.component.html',
  styleUrls: ['./product-showcase.component.css']
})
export class ScrollShowcaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChildren('textPanel') textPanels!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('imagePanel') imagePanels!: QueryList<ElementRef<HTMLDivElement>>;
  @ViewChildren('scrollSection') scrollSections!: QueryList<ElementRef<HTMLDivElement>>;

  sections = [
  {
    title: "Ergonomic Seating Comfort",
    description: "Designed for long journeys, our standard seats offer ergonomic support, adjustable headrests, and ample legroom for a relaxed ride.",
    button: "book seats",
    image: "/assets/Images/bus47.png",

  },
  {
    title: "Luxury Recliner Seats",
    description: "Premium leather recliner seats with ambient lighting, plush cushioning, and modern aesthetics for an executive travel experience.",
     button: "book seats",
    image: "/assets/Images/bus39.png"
  },
  {
    title: "Sleek and Modern Bus Exterior",
    description: "Our buses boast a stylish and aerodynamic exterior, built to offer comfort, safety, and a rich look that stands out on the road.",
    button: "book seats",
    image: "/assets/Images/bus28.jpg"
  },
  {
    title: "Premium Black Leather Seating",
    description: "Elegant black leather seats with sleek stitching offer both comfort and a high-end feel, perfect for luxury-conscious passengers.",
     button: "book seats",
    image: "/assets/Images/bus40.png"
  },
  {
    title: "Onboard Charging Facilities",
    description: "Stay powered throughout your journey with personal charging ports and device holders at every seat—ideal for smartphones and gadgets.",
     button: "book seats",
    image: "/assets/Images/bus41.png"
  },
  {
    title: "Complimentary Snacks Onboard",
    description: "Enjoy a range of refreshments during your journey, including soft drinks like Coke and tasty snacks served right to your seat.",
    button: "book seats",
    image: "/assets/Images/bus42.png"
  },
  {
    title: "Restful Sleeper Cabins",
    description: "Lie back and relax in fully private AC sleeper cabins with cozy bedding, ambient lighting, and a secure environment for restful travel.",
     button: "book seats",
    image: "/assets/Images/bus43.png"
  },
  {
    title: "Professional Driver at the Wheel",
    description: "Our skilled drivers maintain a safe and smooth ride, with a focus on punctuality, professionalism, and courteous service.",
    button: "book seats",
    image: "/assets/Images/bus44.png"
  },
  {
    title: "Mobile Workspace on the Go",
    description: "Work on the move with foldable trays, charging points, and privacy—ideal for professionals needing productivity on the road.",
    button: "book seats",
    image: "/assets/Images/bus45.png"
  },
  {
    title: "Priority & Special Assistance Seating",
    description: "Specially designated seats with extra space and easy access, designed for senior citizens, women, and differently-abled passengers.",
   button: "book seats",
    image: "/assets/Images/bus46.png"
  }
];


  activeIndex = 0;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.setupImageScrollTrigger();
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => this.setActive(0), 0);
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    window.removeEventListener('resize', this.handleResize);
  }

  private setupImageScrollTrigger(): void {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    this.textPanels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel.nativeElement,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => this.setActive(i),
        onEnterBack: () => this.setActive(i),
      });
    });
    this.handleResize();
  }

  setActive(i: number) {
    this.activeIndex = i;
    this.imagePanels.forEach((panel, idx) => {
      if (idx === i) {
        panel.nativeElement.classList.add('active');
      } else {
        panel.nativeElement.classList.remove('active');
      }
    });
  }
  goSeatselection(){
  window.location.href = '/results';
}

  private handleResize = (): void => {
    const height = this.sections.length * window.innerHeight;
    this.container.nativeElement.style.height = `${height}px`;
    ScrollTrigger.refresh();
  };
  constructor(private router: Router) {}

  bookSeats(section: any) {
    // Implement booking logic or navigation here
    // Example: this.router.navigate(['/seat-selection'], { state: { section } });
    alert('Booking seats for: ' + section.title);
  }



}
