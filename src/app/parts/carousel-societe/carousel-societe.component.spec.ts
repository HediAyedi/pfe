import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSocieteComponent } from './carousel-societe.component';

describe('CarouselSocieteComponent', () => {
  let component: CarouselSocieteComponent;
  let fixture: ComponentFixture<CarouselSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
