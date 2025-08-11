import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCorporalComponent } from './historial-corporal.component';

describe('HistorialCorporalComponent', () => {
  let component: HistorialCorporalComponent;
  let fixture: ComponentFixture<HistorialCorporalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialCorporalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialCorporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
