import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelUsuariosComponent } from './del-usuarios.component';

describe('DelUsuariosComponent', () => {
  let component: DelUsuariosComponent;
  let fixture: ComponentFixture<DelUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelUsuariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
