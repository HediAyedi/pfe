import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDesSocieteComponent } from './table-des-societe.component';

describe('TableDesSocieteComponent', () => {
  let component: TableDesSocieteComponent;
  let fixture: ComponentFixture<TableDesSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDesSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDesSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
