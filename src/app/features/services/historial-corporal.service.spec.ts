import { TestBed } from '@angular/core/testing';

import { HistorialCorporalService } from './historial-corporal.service';

describe('HistorialCorporalService', () => {
  let service: HistorialCorporalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialCorporalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
