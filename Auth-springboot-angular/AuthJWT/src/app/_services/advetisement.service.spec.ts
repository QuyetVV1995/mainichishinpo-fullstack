import { TestBed } from '@angular/core/testing';

import { AdvetisementService } from './advetisement.service';

describe('AdvetisementService', () => {
  let service: AdvetisementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvetisementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
