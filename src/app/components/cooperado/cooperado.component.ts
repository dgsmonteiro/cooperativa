import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cooperado',
  templateUrl: './cooperado.component.html',
  styleUrls: ['./cooperado.component.scss']
})
export class CooperadoComponent implements OnInit {

  dados: {
    nome: String;
    email: String;
    cpf: Number;
    foto: String;
    valorMinimoHora: Number;
    valorIdealHora: Number;
    disponibilidade: {};
  };

  constructor() { }

  ngOnInit() {
  }

}
