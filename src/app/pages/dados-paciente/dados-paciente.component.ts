import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { PacienteService } from '../../services/paciente.service';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-dados-paciente',
  templateUrl: './dados-paciente.component.html',
  styleUrls: ['./dados-paciente.component.scss']
})
export class DadosPacienteComponent implements OnInit {
  paciente: UserComponent = new UserComponent();
  pacientes: HttpResponse<UserComponent>[];
  service: PacienteService;

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


}
