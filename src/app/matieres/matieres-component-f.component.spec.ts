import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatieresComponentF } from './matieres-component-f.component';

describe('MatieresComponent', () => {
  let component: MatieresComponentF;
  let fixture: ComponentFixture<MatieresComponentF>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatieresComponentF]
    });
    fixture = TestBed.createComponent(MatieresComponentF);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
