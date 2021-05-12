import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmployeurComponent } from './login-employeur.component';

describe('LoginEmployeurComponent', () => {
  let component: LoginEmployeurComponent;
  let fixture: ComponentFixture<LoginEmployeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginEmployeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
