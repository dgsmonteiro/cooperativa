import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'src/app/services/agenda.service';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Agenda } from '../../models/Agenda';
import { addHours, addMinutes } from 'date-fns';
import { ServicoService } from 'src/app/services/servico.service';
import { Agendamento } from 'src/app/models/Agendamento';
import { NumberValueAccessor } from '@angular/forms';

export interface ServicosDisponiveis {
  name: string;
  _id: string;
  agendamentos: Agendamento[];
}
export interface Servico {
  name: string;
  _id: string;
  valor: number;
}

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {
  minDate = new Date();
  maxDate = new Date(2020, 1, 1);
  valorConsulta: number;
  servico: Servico;
  dataSelecionada: Date;
  servicos: [];
  horarios = [];
  agendasDoMes = {
    mes: new Date(),
    agendas: []
  };
  agendamentos: Agendamento[];
  agendamento: Agendamento;
  agenda: Agenda;
  agendas: Agenda[];
  horarioSelecionado: {hora: Date, agenda: string};
  servicosDisponiveis: ServicosDisponiveis[];


  constructor(private agendaService: AgendaService, private servicoService: ServicoService) { }



  ngOnInit() {
    this.consultaAgendaDoMes(this.minDate);
    this.servicoService.listar()
    .subscribe(resposta => {
      this.servicos = resposta.servicos;
    });
    this.agenda = new Agenda();
    this.agendamento = new Agendamento();
  }

  diasDisponiveis = (d: Date): boolean => {
    let retorno = false;
    if (this.agendasDoMes.agendas.length) {
      for (const agenda of this.agendasDoMes.agendas) {
        this.agenda = agenda;
        if (new Date(this.agenda.inicio) < d && new Date(this.agenda.fim) > d) {
          retorno = true;
        }
      }
    }
    if (this.agendasDoMes.mes.getMonth() !== d.getMonth()) {
      this.consultaAgendaDoMes(d);
    }
    return retorno;
  }
  consultaAgendaDoMes (inicio: Date) {
    this.agendasDoMes.mes = inicio;
    const fim = new Date(inicio.getFullYear(), inicio.getMonth() + 1, 0);
    this.agendaService.diasDisponiveis(new Date(inicio.getFullYear(), inicio.getMonth(), 1), fim)
    .subscribe((dados: any) => {
      this.agendasDoMes.agendas = dados.agendas;
    });
  }

  selecionarDia($event: MatDatepickerInputEvent<Date>) {
    this.dataSelecionada = new Date($event.value);
    this.servicosDisponiveis = new Array();
    this.agendaService.agendasDisponiveis(new Date($event.value))
    .subscribe((dados) => {
      this.agendas = dados.agendas;
      for (const agenda of dados.agendas) {
        this.agendamentos.push(agenda.agendamentos);
        this.agenda = agenda;
        for (const servico of this.servicos) {
          this.servico = servico;
          if (this.servico._id === this.agenda.servicoId) {
            const servicoParametro: ServicosDisponiveis = {
              _id: this.agenda.servicoId,
              name: this.servico.name,
              agendamentos: new Array()
            };
            console.log(this.servicosDisponiveis.indexOf(servicoParametro));

            if (this.servicosDisponiveis.indexOf(servicoParametro) > 0) {
             console.log('resolver o problema de 2 agendas');

            } else {
              this.servicosDisponiveis.push(servicoParametro);
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
      minutos: this.horarioSelecionado.hora.getMinutes(),
      agendaId: this.horarioSelecionado.agenda,
      servicoId: this.servico._id
    };
    this.agendaService.agendar(parametros)
    .subscribe(retorno => {
      console.log('agendado', retorno);
    });
  }
  selecionaServico() {

    for (const agenda of this.agendas) {
      this.agenda = agenda;
      if (this.agenda.servicoId === this.servico._id) {
        this.servicoService.selecionar(this.servico)
        .subscribe(resposta => {
          this.valorConsulta = resposta.servico.valor;
        });
        if (this.agenda.agendamentos.length > 0) {
          let horario: Date = new Date(this.dataSelecionada);
          const fimDoDia: Date = new Date(this.dataSelecionada);
          // tslint:disable-next-line:radix
          horario.setHours(parseInt(this.agenda.horaInicio.split(':')[0]), parseInt(this.agenda.horaInicio.split(':')[1]));
          // tslint:disable-next-line:radix
          fimDoDia.setHours(parseInt(this.agenda.horaFim.split(':')[0]), parseInt(this.agenda.horaFim.split(':')[1]));
          while (horario < fimDoDia ) {
            let livre = true;
              for (const agendamento of this.agenda.agendamentos) {
              this.agendamento = agendamento;
              const horarioFim = addMinutes(horario, this.agenda.tempoAtendimento);
              const agendamentoInicio = new Date(this.agendamento.data);
              agendamentoInicio.setHours(this.agendamento.hora);
              agendamentoInicio.setMinutes(this.agendamento.minuto);
              const agendamentoFim = addMinutes(agendamentoInicio, this.agenda.tempoAtendimento);

              if ((horario < agendamentoFim ||
                  horarioFim < agendamentoInicio) &&
                  (agendamentoFim < horario ||
                  agendamentoInicio < horarioFim)) {
                    livre = false;
              }
            }
            if (livre) {
            this.horarios.push({hora: horario, agenda: this.agenda._id});
            }
            horario = addMinutes(horario, this.agenda.tempoAtendimento + 10);
          }
        } else {
          let horario: Date = new Date(this.dataSelecionada);
          const fimDoDia: Date = new Date(this.dataSelecionada);
          // tslint:disable-next-line:radix
          horario.setHours(parseInt(this.agenda.horaInicio.split(':')[0]), parseInt(this.agenda.horaInicio.split(':')[1]));
          // tslint:disable-next-line:radix
          fimDoDia.setHours(parseInt(this.agenda.horaFim.split(':')[0]), parseInt(this.agenda.horaInicio.split(':')[1]));
          while (horario < fimDoDia ) {
            this.horarios.push({hora: horario, agenda: this.agenda._id});
            horario = addMinutes(horario, this.agenda.tempoAtendimento + 10);
          }
        }
      }
    }
  }

}
