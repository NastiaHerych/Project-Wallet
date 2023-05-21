import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonobankTokenModalComponent } from './monobank-token-modal.component';

describe('MonobankTokenModalComponent', () => {
  let component: MonobankTokenModalComponent;
  let fixture: ComponentFixture<MonobankTokenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonobankTokenModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonobankTokenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
