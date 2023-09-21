import { Component } from '@angular/core';

import { UiService } from '../service/uiSvc';

import { AppMenuComponent } from './app.menu';

@Component({
  selector: 'app-rss',
  templateUrl: '../template/app.component.html'
})

export class AppComponent {
  constructor(private uiService: UiService) {

  }
}
