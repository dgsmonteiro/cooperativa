import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { CooperadoComponent } from './components/cooperado/cooperado.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ProjetoComponent } from './components/projeto/projeto.component';
import { MetodologiaComponent } from './components/metodologia/metodologia.component';
import { DailyComponent } from './components/metodologia/daily/daily.component';
import { SprintComponent } from './components/metodologia/sprint/sprint.component';
import { ReviewComponent } from './components/metodologia/review/review.component';
import { RetrospectiveComponent } from './components/metodologia/retrospective/retrospective.component';
import { PlanningComponent } from './components/metodologia/planning/planning.component';
import { GroomingComponent } from './components/metodologia/grooming/grooming.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from './pages/pages.module';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CooperadoComponent,
    ClienteComponent,
    ProjetoComponent,
    MetodologiaComponent,
    DailyComponent,
    SprintComponent,
    ReviewComponent,
    RetrospectiveComponent,
    PlanningComponent,
    GroomingComponent,
    UserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
