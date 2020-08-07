import { TestBed } from '@angular/core/testing';

import { BoganService } from './bogan.service';

describe('BoganService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoganService = TestBed.get(BoganService);
    expect(service).toBeTruthy();
  });
});
