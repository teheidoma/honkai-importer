import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {AppNavbarComponent} from './app-navbar/app-navbar.component';
import {AppPageWishComponent} from './app-page-wish/app-page-wish.component';
import {AppPageTimeComponent} from './app-page-time/app-page-time.component';
import {AppPageHomeComponent} from './app-page-home/app-page-home.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app.routing.module";
import {WishBannerComponent} from './app-page-wish/wish-banner/wish-banner.component';
import {WishBannerLabelComponent} from './app-page-wish/wish-banner/wish-banner-label/wish-banner-label.component';
import {APP_INITIALIZER} from '@angular/core';
import {AlertService} from "./service/alert.service";
import { TimeTableComponent } from './app-page-time/time-table/time-table.component';
import { WishTableComponent } from './app-page-wish/wish-table/wish-table.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppPageWishComponent,
    AppPageTimeComponent,
    AppPageHomeComponent,
    WishBannerComponent,
    WishBannerLabelComponent,
    TimeTableComponent,
    WishTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    AppRoutingModule
  ],
  providers: [
    AlertService,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: AlertService) => function() { return service.init(); },
      deps: [AlertService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
