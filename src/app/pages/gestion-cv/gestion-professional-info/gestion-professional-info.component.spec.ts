import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProfessionalInfoComponent } from './gestion-professional-info.component';

describe('GestionProfessionalInfoComponent', () => {
  let component: GestionProfessionalInfoComponent;
  let fixture: ComponentFixture<GestionProfessionalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionProfessionalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionProfessionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
