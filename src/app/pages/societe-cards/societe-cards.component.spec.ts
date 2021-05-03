import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocieteCardsComponent } from './societe-cards.component';

describe('SocieteCardsComponent', () => {
  let component: SocieteCardsComponent;
  let fixture: ComponentFixture<SocieteCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocieteCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocieteCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
