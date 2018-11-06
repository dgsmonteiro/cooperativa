import { Component, OnInit } from '@angular/core';
import { ProjetoComponent } from '../projeto/projeto.component';
import { CooperadoComponent } from '../cooperado/cooperado.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  dados: {
    nome: String;
    email: String;
    celular: Number;
    conta: {
      creditos: Number;
      dadosDePagamento: {};
    };
    projeto: ProjetoComponent;
    equipe: [CooperadoComponent];
  };

  constructor() { }

  ngOnInit() {
  }

}
