import { Component, OnInit } from '@angular/core';
import {Form, Validators, FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserComponent } from 'src/app/components/user/user.component';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  user: UserComponent;




  constructor(private formBuilder: FormBuilder, private rota: ActivatedRoute, private router: Router) {

    this.user = new UserComponent();

    this.formLogin = formBuilder.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required]
      });

  }

  ngOnInit() {
  }

}
