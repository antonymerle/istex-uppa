import { TestBed } from '@angular/core/testing';

import { IstexService } from './istex.service';

describe('IstexService', () => {
  let service: IstexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IstexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
