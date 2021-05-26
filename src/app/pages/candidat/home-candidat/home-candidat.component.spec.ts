import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCandidatComponent } from './home-candidat.component';

describe('HomeCandidatComponent', () => {
  let component: HomeCandidatComponent;
  let fixture: ComponentFixture<HomeCandidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCandidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
