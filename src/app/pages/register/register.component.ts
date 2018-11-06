import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserComponent } from 'src/app/components/user/user.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  user: UserComponent;

  constructor(private formBuilder: FormBuilder) {
    this.user = new UserComponent();

    this.formRegister = formBuilder.group({
      name: ['', Validators.required],
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required],
      passwordRewrite : ['', Validators.required]
      });

   }

  ngOnInit() {
  }

}
