import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutcomeModalComponent } from './add-outcome-modal.component';

describe('AddOutcomeModalComponent', () => {
  let component: AddOutcomeModalComponent;
  let fixture: ComponentFixture<AddOutcomeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOutcomeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOutcomeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
