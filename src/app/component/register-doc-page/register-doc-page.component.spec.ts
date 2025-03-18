import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDocPageComponent } from './register-doc-page.component';

describe('RegisterDocPageComponent', () => {
  let component: RegisterDocPageComponent;
  let fixture: ComponentFixture<RegisterDocPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDocPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDocPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
