import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../../components/user/user.component';

@Component({
  selector: 'app-dados-paciente',
  templateUrl: './dados-paciente.component.html',
  styleUrls: ['./dados-paciente.component.scss']
})
export class DadosPacienteComponent implements OnInit {
  user: UserComponent = new UserComponent();

  constructor() { }

  ngOnInit() {
  }

}
