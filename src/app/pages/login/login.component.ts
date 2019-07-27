import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserComponent } from 'src/app/components/user/user.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { HttpResponse } from '@angular/common/http';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  currentUser: UserComponent;
  user: User;



  constructor(private formBuilder: FormBuilder, private rota: ActivatedRoute, private router: Router, private authService: AuthService) {

    this.currentUser = new UserComponent();

    this.formLogin = formBuilder.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required]
      });

  }

  ngOnInit() {
  }

  login () {
    this.authService.login(this.formLogin.controls.email.value, this.formLogin.controls.password.value)
        .subscribe((resposta: HttpResponse<UserComponent>) => {
          this.currentUser.login(resposta);
          this.router.navigate(['/']);
          console.log('user:', this.user);
        });
  }

}
