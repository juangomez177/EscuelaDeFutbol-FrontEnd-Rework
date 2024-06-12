import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterUComponent } from './footer-u.component';

describe('FooterUComponent', () => {
  let component: FooterUComponent;
  let fixture: ComponentFixture<FooterUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
