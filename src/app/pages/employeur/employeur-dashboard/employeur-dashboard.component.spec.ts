import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeurDashboardComponent } from './employeur-dashboard.component';

describe('EmployeurDashboardComponent', () => {
  let component: EmployeurDashboardComponent;
  let fixture: ComponentFixture<EmployeurDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeurDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeurDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
