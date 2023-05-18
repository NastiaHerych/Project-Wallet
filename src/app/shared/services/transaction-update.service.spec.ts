import { TestBed } from '@angular/core/testing';

import { TransactionUpdateService } from './transaction-update.service';

describe('TransactionUpdateService', () => {
  let service: TransactionUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
