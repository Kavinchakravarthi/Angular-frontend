import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
    { title: "Sample Title 1", description: "Sample description for section 1.", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" },
    { title: "buses imagae sjsjshj", description: "Sample description for section 2.", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sample Title 3", description: "Sample description for section 3.", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sample Title 4", description: "Sample description for section 4.", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sample Title 5", description: "Sample description for section 5.", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sample Title 6", description: "Sample description for section 6.", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sample Title 7", description: "Sample description for section 7.", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sample Title 8", description: "Sample description for section 8.", image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3c8b?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sample Title 9", description: "Sample description for section 9.", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80" },
    { title: "Sample Title 10", description: "Sample description for section 10.", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" }
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

  private handleResize = (): void => {
    const height = this.sections.length * window.innerHeight;
    this.container.nativeElement.style.height = `${height}px`;
    ScrollTrigger.refresh();
  };
}
