import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPayamentSectionComponent } from './app-payament-section.component';

describe('AppPayamentSectionComponent', () => {
  let component: AppPayamentSectionComponent;
  let fixture: ComponentFixture<AppPayamentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPayamentSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPayamentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
