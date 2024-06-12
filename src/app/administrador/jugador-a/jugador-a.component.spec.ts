import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadorAComponent } from './jugador-a.component';

describe('JugadorAComponent', () => {
  let component: JugadorAComponent;
  let fixture: ComponentFixture<JugadorAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadorAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
