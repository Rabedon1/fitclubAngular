import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRutinasComponent } from './detalle-rutinas.component';

describe('DetalleRutinasComponent', () => {
  let component: DetalleRutinasComponent;
  let fixture: ComponentFixture<DetalleRutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleRutinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
