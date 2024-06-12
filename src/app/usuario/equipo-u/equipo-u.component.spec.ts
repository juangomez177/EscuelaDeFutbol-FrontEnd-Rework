import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipoUComponent } from './equipo-u.component';

describe('EquipoUComponent', () => {
  let component: EquipoUComponent;
  let fixture: ComponentFixture<EquipoUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipoUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
