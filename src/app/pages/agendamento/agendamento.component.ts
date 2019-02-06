import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date(2020, 0, 1);
  valorConsulta = 150;
  horarios = [];
  constructor() { }

  ngOnInit() {
  }

  diasDisponiveis = (d: Date): boolean => {
    const day = d.getDay();

    return day !== 0 && day !== 6;
  }


}
