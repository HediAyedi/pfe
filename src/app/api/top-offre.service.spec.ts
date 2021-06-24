/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TopOffreService } from './top-offre.service';

describe('Service: TopOffre', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopOffreService]
    });
  });

  it('should ...', inject([TopOffreService], (service: TopOffreService) => {
    expect(service).toBeTruthy();
  }));
});
