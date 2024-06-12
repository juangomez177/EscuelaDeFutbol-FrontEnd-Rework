import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderUComponent } from './header-u.component';

describe('HeaderUComponent', () => {
  let component: HeaderUComponent;
  let fixture: ComponentFixture<HeaderUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderUComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
