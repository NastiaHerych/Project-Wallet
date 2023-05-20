import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceMenuComponent } from './balance-menu.component';

describe('BalanceMenuComponent', () => {
  let component: BalanceMenuComponent;
  let fixture: ComponentFixture<BalanceMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
