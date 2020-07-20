import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  user: UserComponent = new UserComponent();
  formRecovery: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.formRecovery = formBuilder.group({
      email : ['', Validators.compose([Validators.required, Validators.email])]
      
      });
  }


  ngOnInit() {
    
  
  }

  recovery () {
    if (this.formRecovery.valid) {
      this.authService.forgotPassword(this.formRecovery.controls.email.value)
        .subscribe((resposta: HttpResponse<UserComponent>) => {
          this.router.navigate(['/']);
        });
    }
  }


}
