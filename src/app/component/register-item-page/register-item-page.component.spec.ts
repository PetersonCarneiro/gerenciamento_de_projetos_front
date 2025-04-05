import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterItemPageComponent } from './register-item-page.component';

describe('RegisterItemPageComponent', () => {
  let component: RegisterItemPageComponent;
  let fixture: ComponentFixture<RegisterItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterItemPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
