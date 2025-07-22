import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateJourneyComponent } from './rate-journey.component';

describe('RateJourneyComponent', () => {
  let component: RateJourneyComponent;
  let fixture: ComponentFixture<RateJourneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateJourneyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
