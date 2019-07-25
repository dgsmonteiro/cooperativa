import { Component, OnInit } from '@angular/core';
import { UserComponent } from 'src/app/components/user/user.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GoogleMapsService } from 'src/app/services/googlemaps.service';
import { HttpResponse } from '@angular/common/http';

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

  constructor(private _formBuilder: FormBuilder, private googleMaps: GoogleMapsService) { }

  ngOnInit() {
    this.passo1 = this._formBuilder.group({
      servico: ['', Validators.required],
      tempoServico: ['']
    });
    this.passo2 = this._formBuilder.group({
      minDate: ['', Validators.required],
      maxDate: ['', Validators.required],
      horarioSelecionado: ['', Validators.required ],
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
      pagseguro: [true]
    });
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
}
