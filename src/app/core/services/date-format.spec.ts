import { TestBed } from '@angular/core/testing';
import { DateFormat } from './date-format';

describe('DateFormat', () => {
  let service: DateFormat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFormat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
