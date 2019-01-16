import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { PacienteService } from '../../services/paciente.service';
import { HttpResponse } from '@angular/common/http';

export interface PeriodicElement {
  date: string;
  pesoAI: string;
  porcentagemAdequacao: string;
  classificacao: string;
}

@Component({
  selector: 'app-dados-paciente',
  templateUrl: './dados-paciente.component.html',
  styleUrls: ['./dados-paciente.component.scss']
})
export class DadosPacienteComponent implements OnInit {
  user: UserComponent = new UserComponent;
  busca: String;
  paciente: HttpResponse<Object> = null;
  pacientes: HttpResponse<UserComponent>[];
  service: PacienteService;
  anamnese: {};
  classificacaoValores: PeriodicElement[] = [
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'},
    {date: '01/01/2019', pesoAI: '20 Kg', porcentagemAdequacao: '30%', classificacao: 'Alta'}
  ];
  displayedColumns: string[] = ['date', 'pesoAI', 'porcentagemAdequacao', 'classificacao'];


  constructor(private pacienteService: PacienteService) {
  }

  ngOnInit() {
    this.pacienteService.listar()
    .subscribe((resposta: HttpResponse<UserComponent>[]) => {
      JSON.stringify(resposta);
      this.pacientes = resposta;
    });
  }

  // search = (text$: Observable<string>) =>
  //   text$.pipe(
  //     debounceTime(200),
  //     distinctUntilChanged(),
  //     map(term => term.length < 2 ? []
  //       : this.pacientes.name.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  //   )

  selecionaPaciente (paciente: UserComponent) {
    this.pacienteService.selecionar(paciente.id)
    .subscribe((resposta: HttpResponse<Object>) => {
      JSON.stringify(resposta);
      this.paciente = resposta;
    });

  }


}
