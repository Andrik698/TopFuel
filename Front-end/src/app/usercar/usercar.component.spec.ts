import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercarComponent } from './usercar.component';

describe('UsercarComponent', () => {
  let component: UsercarComponent;
  let fixture: ComponentFixture<UsercarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
