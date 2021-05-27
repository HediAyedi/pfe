import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPersonalInfoComponent } from './gestion-personal-info.component';

describe('GestionPersonalInfoComponent', () => {
  let component: GestionPersonalInfoComponent;
  let fixture: ComponentFixture<GestionPersonalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPersonalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
