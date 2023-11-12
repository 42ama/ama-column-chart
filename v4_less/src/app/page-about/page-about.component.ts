import { Component } from '@angular/core';
import { ROUTES } from '../app-routes';

@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.less']
})
export class PageAboutComponent {
  public ROUTES = ROUTES;
}
