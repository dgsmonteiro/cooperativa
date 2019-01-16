import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutComponent } from './pages/about/about.component';
import { UserComponent } from './components/user/user.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { DadosPacienteComponent } from './pages/dados-paciente/dados-paciente.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'agenda', component: AgendaComponent},
  {path: 'agendamento', component: AgendamentoComponent},
  {path: 'dados-paciente', component: DadosPacienteComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: '**', component: Page404Component }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
