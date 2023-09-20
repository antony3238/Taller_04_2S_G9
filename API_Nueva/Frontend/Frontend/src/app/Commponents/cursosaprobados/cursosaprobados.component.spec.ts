import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosaprobadosComponent } from './cursosaprobados.component';

describe('CursosaprobadosComponent', () => {
  let component: CursosaprobadosComponent;
  let fixture: ComponentFixture<CursosaprobadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosaprobadosComponent]
    });
    fixture = TestBed.createComponent(CursosaprobadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
