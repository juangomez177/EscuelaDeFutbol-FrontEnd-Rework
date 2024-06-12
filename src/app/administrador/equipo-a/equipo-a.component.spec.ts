import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipoAComponent } from './equipo-a.component';

describe('EquipoAComponent', () => {
  let component: EquipoAComponent;
  let fixture: ComponentFixture<EquipoAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipoAComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EquipoAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
