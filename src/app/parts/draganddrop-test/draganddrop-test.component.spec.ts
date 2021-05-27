import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraganddropTESTComponent } from './draganddrop-test.component';

describe('DraganddropTESTComponent', () => {
  let component: DraganddropTESTComponent;
  let fixture: ComponentFixture<DraganddropTESTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraganddropTESTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraganddropTESTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
