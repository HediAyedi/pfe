import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDesCandidatsComponent } from './table-des-candidats.component';

describe('TableDesCandidatsComponent', () => {
  let component: TableDesCandidatsComponent;
  let fixture: ComponentFixture<TableDesCandidatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDesCandidatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDesCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
