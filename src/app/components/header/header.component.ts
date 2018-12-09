import { Component, OnInit, Input } from '@angular/core';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title = '';
  user: UserComponent = new UserComponent();

  constructor() {
   }

  ngOnInit() {
  }

}
