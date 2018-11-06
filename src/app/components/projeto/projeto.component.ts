import { Component, OnInit } from '@angular/core';
import { CooperadoComponent } from '../cooperado/cooperado.component';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})
export class ProjetoComponent implements OnInit {

  dados: {
    titulo: String;
    descricao: String;
    orcamento: {
      valor: Number;
      horas: Number;
      numeroSprints: Number;
      diasSprint: Number;
    }
    recursos: [CooperadoComponent];
    andamento: Number;

  };

  constructor() { }

  ngOnInit() {
  }

}
