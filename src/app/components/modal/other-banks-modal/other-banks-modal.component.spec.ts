import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherBanksModalComponent } from './other-banks-modal.component';

describe('OtherBanksModalComponent', () => {
  let component: OtherBanksModalComponent;
  let fixture: ComponentFixture<OtherBanksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherBanksModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherBanksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
