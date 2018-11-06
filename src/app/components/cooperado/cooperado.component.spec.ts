import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperadoComponent } from './cooperado.component';

describe('CooperadoComponent', () => {
  let component: CooperadoComponent;
  let fixture: ComponentFixture<CooperadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
