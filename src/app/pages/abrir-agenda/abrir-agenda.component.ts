import { Component, OnInit, Inject } from '@angular/core';
import { UserComponent } from 'src/app/components/user/user.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GoogleMapsService } from 'src/app/services/googlemaps.service';
import { HttpResponse } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalAdicionarServico } from 'src/app/components/modalAdicionarServico/modalAdicionarServico.component';
import { AgendaService } from 'src/app/services/agenda.service';
import { ThrowStmt } from '@angular/compiler';

export interface DadosServico {
  name: string;
  descricao: string;
  valor: Number;
}

@Component({
  selector: 'app-abrir-agenda',
  templateUrl: './abrir-agenda.component.html',
  styleUrls: ['./abrir-agenda.component.scss']
})
export class AbrirAgendaComponent implements OnInit {

  passo1: FormGroup;
  passo2: FormGroup;
  passo3: FormGroup;
  passo4: FormGroup;

  user: UserComponent = new UserComponent;

  minDate = new Date();
  maxDate = new Date(2020, 0, 1);
  valorConsulta = 150;
  pagseguro = false;
  dinheiro = true;
  horarios = {
    segunda: true,
    terca: true,
    quarta: true,
    quinta: true,
    sexta: true,
    sabado: false,
    domingo: false
  };


  localizacao = '';
  lat = -23.8779431;
  lng = -49.8046873;
  zoom = 15;
  servicos: { name: string; descricao: string; valor: number; }[];
  novoServico: DadosServico;

  constructor(private _formBuilder: FormBuilder, private googleMaps: GoogleMapsService, public dialog: MatDialog, private agendaService: AgendaService) { }

  ngOnInit() {
    this.passo1 = this._formBuilder.group({
      servico: ['', Validators.required],
      tempoServico: ['']
    });
    this.passo2 = this._formBuilder.group({
      minDate: [''],
      maxDate: [''],
      horarioSelecionado: [''],
      horaInicio: [''],
      horaFim: [''],
      segunda: [true],
      terca: [true],
      quarta: [true],
      quinta: [true],
      sexta: [true],
      sabado: [false],
      domingo: [false]
    });
    this.passo3 = this._formBuilder.group({
      localizacao: ['', Validators.required]
    });
    this.passo4 = this._formBuilder.group({
      valorConsulta: ['', Validators.required],
      dinheiro: [true],
      pagSeguro: [true]
    });

    this.servicos = [
      { 
        name:'Consulta + Bioimpedância',
        descricao: 'Teste',
        valor: 160
      },
      { 
        name:'Consulta',
        descricao: 'Teste',
        valor: 100
      },
      { 
        name:'Bioimpedância',
        descricao: 'Teste',
        valor: 80
      }
    ]
  }

  diasDisponiveis = (d: Date): boolean => {
    const day = d.getDay();

    return day !== 0 && day !== 6;
  }

  pesquisarEndereco () {
    this.googleMaps.pesquisar(this.passo3.value.localizacao)
    .subscribe((resposta: HttpResponse<UserComponent>) => {
      this.atualizarEndereco(resposta);

    });
  }
  atualizarEndereco(dados) {
    if ( dados.status === 'OK' && dados.results[0]) {
      this.localizacao = dados.results[0].formatted_address;
      this.lat = dados.results[0].geometry.location.lat;
      this.lng = dados.results[0].geometry.location.lng;
    }
  }
  adicionarServico(){

    const dialogRef = this.dialog.open(ModalAdicionarServico, {
      width: '250px',
      data: {name: '', descricao: '', valor: 0}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.novoServico = result;
    });
  }
  abrirAgenda(){
    if (this.passo1.valid && this.passo2.valid && this.passo3.valid && this.passo4.valid) {
      this.agendaService.nova({
        user: this.user,
        userId: this.user.id,
        inicio: this.passo2.value.horarioSelecionado.from,
        fim: this.passo2.value.horarioSelecionado.to,
        horaInicio: this.passo2.value.horaInicio,
        horaFim: this.passo2.value.horaFim,
        servico: this.passo1.value.servico,
        tempoAtendimento: this.passo1.value.tempoServico,
        endereco: this.passo3.value.localizacao,
        valor: this.passo4.value.valorConsulta,
        formaPagamento: {dinheiro: this.passo4.value.dinheiro, pagSeguro: this.passo4.value.pagSeguro},

      }).subscribe((resposta: HttpResponse<UserComponent>) => {
      console.log(resposta);
      })
    }
  }
}
