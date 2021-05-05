/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdresseService } from './adresse.service';

describe('Service: Adresse', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdresseService]
    });
  });

  it('should ...', inject([AdresseService], (service: AdresseService) => {
    expect(service).toBeTruthy();
  }));
});
