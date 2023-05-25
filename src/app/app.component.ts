import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // @ViewChild('url') urlElem:ElementRef|undefined;


  constructor() {
  }

  public parseLink () {
    // this.parserService.parseUrl(this.urlElem?.nativeElement.value);
    // this.parserService.getWishes(map)
  }
}
