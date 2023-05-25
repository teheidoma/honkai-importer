import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPageWishComponent } from './app-page-wish.component';

describe('AppPageWishComponent', () => {
  let component: AppPageWishComponent;
  let fixture: ComponentFixture<AppPageWishComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppPageWishComponent]
    });
    fixture = TestBed.createComponent(AppPageWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
