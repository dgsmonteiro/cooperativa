import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  autenticate: boolean;
  id: number;
  name: String;
  email: String;
  accountType: String;
  createdAt: Date;
  token: String;
  accountTypeList: string[];

  constructor() {
    this.accountTypeList = [
      'desenvolvedor',
      'scrum',
      'po',
      'cliente',
      'vendedor'
    ];
   }

  ngOnInit() {
  }

  login(data) {
    this.id = data.user._id;
    this.name = data.user.name;
    this.email = data.user.email;
    this.createdAt = data.user.createdAt;
    this.token = this.token;
  }
  isAutenticate () {
    return this.autenticate;
  }

}
