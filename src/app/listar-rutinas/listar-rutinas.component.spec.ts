import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRutinasComponent } from './listar-rutinas.component';

describe('ListarRutinasComponent', () => {
  let component: ListarRutinasComponent;
  let fixture: ComponentFixture<ListarRutinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarRutinasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRutinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
