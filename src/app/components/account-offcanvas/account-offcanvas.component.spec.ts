import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOffcanvasComponent } from './account-offcanvas.component';

describe('AccountOffcanvasComponent', () => {
  let component: AccountOffcanvasComponent;
  let fixture: ComponentFixture<AccountOffcanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountOffcanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
