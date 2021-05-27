import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreCarouselComponent } from './offre-carousel.component';

describe('OffreCarouselComponent', () => {
  let component: OffreCarouselComponent;
  let fixture: ComponentFixture<OffreCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffreCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
