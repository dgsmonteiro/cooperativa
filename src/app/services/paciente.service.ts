import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from '../models/User';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) {
   }

  listar() {

    return this.http.get<any>(`${environment.apiUrl}/pacientes`)
        .pipe(map(pacientes => {
            // login successful if there's a jwt token in the response
            if (pacientes) {
                console.log(JSON.stringify(pacientes));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
            }

            return pacientes;
        }));
}
  selecionar(id) {
    return this.http.get<any>(`${environment.apiUrl}/pacientes/selecionar`)
        .pipe(map(paciente => {
            // login successful if there's a jwt token in the response
            if (paciente) {
                console.log(JSON.stringify(paciente));
                // store user details and jwt token in local storage to keep user logged in between page refreshes
            }
            return paciente;
        }));
}

}
