import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'COOPERDEV';
  user: Object = {
    autenticate: false,
    id: Number,
    accountType: ''
  };
}
