import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishBannerLabelComponent } from './wish-banner-label.component';

describe('WishBannerLabelComponent', () => {
  let component: WishBannerLabelComponent;
  let fixture: ComponentFixture<WishBannerLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishBannerLabelComponent]
    });
    fixture = TestBed.createComponent(WishBannerLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
