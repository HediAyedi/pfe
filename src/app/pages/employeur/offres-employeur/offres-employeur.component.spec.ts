import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresEmployeurComponent } from './offres-employeur.component';

describe('OffresEmployeurComponent', () => {
  let component: OffresEmployeurComponent;
  let fixture: ComponentFixture<OffresEmployeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffresEmployeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffresEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
