import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuUComponent } from './menu-u.component';

describe('MenuUComponent', () => {
  let component: MenuUComponent;
  let fixture: ComponentFixture<MenuUComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuUComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
