import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitarPerfilComponent } from './visitar-perfil.component';

describe('VisitarPerfilComponent', () => {
  let component: VisitarPerfilComponent;
  let fixture: ComponentFixture<VisitarPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitarPerfilComponent]
    });
    fixture = TestBed.createComponent(VisitarPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
