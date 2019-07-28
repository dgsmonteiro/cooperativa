import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Agenda } from '../../models/Agenda';
import { addHours, addMinutes } from 'date-fns';


@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date(2020, 1, 1);
  valorConsulta = 150;
  servico: String;
  horarios = [];
  agendasDoMes = {
    mes: new Date(),
    agendas: []
  };
  horarioSelecionado: {hora: Date, agenda: String};


  constructor(private agendaService: AgendaService) { }



  ngOnInit() {
    this.consultaAgendaDoMes(this.minDate);
  }

  diasDisponiveis = (d: Date): boolean => {
    let retorno = false;
    if (this.agendasDoMes.agendas.length) {
      for (let agenda of this.agendasDoMes.agendas) {
        if (new Date(agenda.inicio) < d && new Date(agenda.fim) > d) {
          retorno = true;
        }
      }
    }
    if (this.agendasDoMes.mes.getMonth() !== d.getMonth()){
      this.consultaAgendaDoMes(d);
    }
    return retorno;  
    
  }
  consultaAgendaDoMes (inicio: Date) {
    this.agendasDoMes.mes = inicio;
    const fim = new Date(inicio.getFullYear(), inicio.getMonth() + 1, 0)
    this.agendaService.diasDisponiveis(new Date(inicio.getFullYear(), inicio.getMonth(), 1), fim)
    .subscribe((dados: any) => {
      this.agendasDoMes.agendas = dados.agendas;
    });
    
  }

  selecionarDia($event: MatDatepickerInputEvent<Date>){
    let agendas: [any];
    this.horarios = [];
    this.agendaService.agendasDisponiveis(new Date($event.value))
    .subscribe((dados) => {
      agendas = dados.agendas;
      for (let agenda of agendas) {
        console.log(agenda);
        if (agenda.servico === this.servico) {
          if (agenda.agendamentos.length > 0) {
            let horario: Date = new Date($event.value);
            let fimDoDia: Date = new Date($event.value);
            horario.setHours(agenda.horaInicio.split(':')[0],agenda.horaInicio.split(':')[1]);
            fimDoDia.setHours(agenda.horaFim.split(':')[0],agenda.horaInicio.split(':')[1]);
            while (horario < fimDoDia ) {
              let livre = true;
              for (let agendamento of agenda.agendamentos) {
                const horarioFim = addMinutes(horario, agenda.tempoAtendimento);
                let agendamentoInicio = new Date(agendamento.data);
                agendamentoInicio.setHours(agendamento.hora);
                agendamentoInicio.setMinutes(agendamento.minutos);
                const agendamentoFim = addMinutes(agendamentoInicio, agenda.tempoAtendimento);

                if ((horario < agendamentoFim ||
                    horarioFim < agendamentoInicio) &&
                    (agendamentoFim < horario ||
                    agendamentoInicio < horarioFim)) {
                      livre = false;
                }                
              }
              if (livre)
              this.horarios.push({hora: horario, agenda: agenda._id});

              horario = addMinutes(horario, agenda.tempoAtendimento + 10);
            }
            
          } else {
            let horario: Date = new Date($event.value);
            let fimDoDia: Date = new Date($event.value);
            horario.setHours(agenda.horaInicio.split(':')[0],agenda.horaInicio.split(':')[1]);
            fimDoDia.setHours(agenda.horaFim.split(':')[0],agenda.horaInicio.split(':')[1]);
            while (horario < fimDoDia ) {
              this.horarios.push({hora: horario, agenda: agenda._id});
              horario = addMinutes(horario, agenda.tempoAtendimento + 10);
            }
          }
        }
      }
    });
    
  }

  agendar() {
    const parametros = {
      data: this.horarioSelecionado.hora,
      hora: this.horarioSelecionado.hora.getHours() ,
      minutos: this.horarioSelecionado.hora.getMinutes()<10 ? '0'+ this.horarioSelecionado.hora.getMinutes() : this.horarioSelecionado.hora.getMinutes(),
      agendaId: this.horarioSelecionado.agenda,
      servico: this.servico
    }
    this.agendaService.agendar(parametros)
    .subscribe(retorno => {
      console.log('agendado', retorno);
    });
  }


}
