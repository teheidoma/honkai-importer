import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-wish-banner-label',
  templateUrl: './wish-banner-label.component.html',
  styleUrls: ['./wish-banner-label.component.css']
})
export class WishBannerLabelComponent {
  @Input()
  title: string | undefined;
  @Input()
  subtitle: string | undefined;
  @Input()
  number: string | undefined;
}
