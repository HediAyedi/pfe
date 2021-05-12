import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmployeurComponent } from './profile-employeur.component';

describe('ProfileEmployeurComponent', () => {
  let component: ProfileEmployeurComponent;
  let fixture: ComponentFixture<ProfileEmployeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEmployeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEmployeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
