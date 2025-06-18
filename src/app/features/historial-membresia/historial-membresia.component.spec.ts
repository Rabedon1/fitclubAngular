import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialMembresiaComponent } from './historial-membresia.component';

describe('HistorialMembresiaComponent', () => {
  let component: HistorialMembresiaComponent;
  let fixture: ComponentFixture<HistorialMembresiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialMembresiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
