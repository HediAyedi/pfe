import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCvComponent } from './gestion-cv.component';

describe('GestionCvComponent', () => {
  let component: GestionCvComponent;
  let fixture: ComponentFixture<GestionCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
