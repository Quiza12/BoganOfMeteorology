import { TestBed } from '@angular/core/testing';

import { BomDataService } from './bom-data.service';

describe('BomDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BomDataService = TestBed.get(BomDataService);
    expect(service).toBeTruthy();
  });
});
