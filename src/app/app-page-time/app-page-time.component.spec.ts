import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPageTimeComponent } from './app-page-time.component';

describe('AppPageTimeComponent', () => {
  let component: AppPageTimeComponent;
  let fixture: ComponentFixture<AppPageTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPageTimeComponent]
    });
    fixture = TestBed.createComponent(AppPageTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
