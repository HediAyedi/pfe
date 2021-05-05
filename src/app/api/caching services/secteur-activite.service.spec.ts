/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecteurActiviteService } from './secteur-activite.service';

describe('Service: SecteurActivite', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecteurActiviteService]
    });
  });

  it('should ...', inject([SecteurActiviteService], (service: SecteurActiviteService) => {
    expect(service).toBeTruthy();
  }));
});
