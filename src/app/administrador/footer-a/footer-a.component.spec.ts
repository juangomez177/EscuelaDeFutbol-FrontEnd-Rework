import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterAComponent } from './footer-a.component';

describe('FooterAComponent', () => {
  let component: FooterAComponent;
  let fixture: ComponentFixture<FooterAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
