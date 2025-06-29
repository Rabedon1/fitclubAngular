import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusculosComponent } from './musculos.component';

describe('MusculosComponent', () => {
  let component: MusculosComponent;
  let fixture: ComponentFixture<MusculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusculosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
