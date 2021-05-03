import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialNavAndSearchComponent } from './official-nav-and-search.component';

describe('OfficialNavAndSearchComponent', () => {
  let component: OfficialNavAndSearchComponent;
  let fixture: ComponentFixture<OfficialNavAndSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialNavAndSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialNavAndSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
