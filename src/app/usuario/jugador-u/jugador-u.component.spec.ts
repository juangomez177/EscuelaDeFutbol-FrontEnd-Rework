import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadorUComponent } from './jugador-u.component';

describe('JugadorUComponent', () => {
  let component: JugadorUComponent;
  let fixture: ComponentFixture<JugadorUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JugadorUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadorUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
