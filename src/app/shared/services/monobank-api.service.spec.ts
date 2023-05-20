import { TestBed } from '@angular/core/testing';

import { MonobankAPIService } from './monobank-api.service';

describe('MonobankAPIService', () => {
  let service: MonobankAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonobankAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
