import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionExperienceComponent } from './gestion-experience.component';

describe('GestionExperienceComponent', () => {
  let component: GestionExperienceComponent;
  let fixture: ComponentFixture<GestionExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
