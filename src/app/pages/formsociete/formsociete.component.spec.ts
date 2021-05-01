import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsocieteComponent } from './formsociete.component';

describe('FormsocieteComponent', () => {
  let component: FormsocieteComponent;
  let fixture: ComponentFixture<FormsocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
