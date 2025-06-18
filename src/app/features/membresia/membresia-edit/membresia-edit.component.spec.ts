import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembresiaEditComponent } from './membresia-edit.component';

describe('MembresiaEditComponent', () => {
  let component: MembresiaEditComponent;
  let fixture: ComponentFixture<MembresiaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembresiaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembresiaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
