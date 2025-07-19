import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusResultsComponent } from './bus-results.component';

describe('BusResultsComponent', () => {
  let component: BusResultsComponent;
  let fixture: ComponentFixture<BusResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
