import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuAComponent } from './menu-a.component';

describe('MenuAComponent', () => {
  let component: MenuAComponent;
  let fixture: ComponentFixture<MenuAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
