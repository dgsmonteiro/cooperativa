import {
  Component, OnInit, ViewChild, ElementRef, AfterViewChecked
} from '@angular/core';
import { UserComponent } from '../../components/user/user.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import {
  PRESET_FORMS, PRESET_VALIDATORS, PRESET_FORMATTERS
} from '../../models/FormModal';
import { SelectionModel } from '@angular/cdk/collections';
import { AgendaService } from 'src/app/services/agenda.service';

export interface DadosAgenda {
  fim: Date;
  inicio: Date;
  servico: string;
  valor: Number;
}

const ELEMENT_DATA: DadosAgenda[] = [
  {inicio: new Date(), fim: new Date(), valor: 1.0079, servico: 'H'},
  {inicio: new Date(), fim: new Date(), valor: 4.0026, servico: 'He'},
  {inicio: new Date(), fim: new Date(), valor: 6.941, servico: 'Li'},
  {inicio: new Date(), fim: new Date(), valor: 9.0122, servico: 'Be'},
  {inicio: new Date(), fim: new Date(), valor: 10.811, servico: 'B'},
  {inicio: new Date(), fim: new Date(), valor: 12.0107, servico: 'C'},
  {inicio: new Date(), fim: new Date(), valor: 14.0067, servico: 'N'},
  {inicio: new Date(), fim: new Date(), valor: 15.9994, servico: 'O'},
  {inicio: new Date(), fim: new Date(), valor: 18.9984, servico: 'F'},
  {inicio: new Date(), fim: new Date(), valor: 20.1797, servico: 'Ne'},
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserComponent = new UserComponent();
  displayedColumns: string[] = ['select', 'inicio', 'fim', 'servico', 'valor'];
  dataSource = new MatTableDataSource<DadosAgenda>(ELEMENT_DATA);
  selection = new SelectionModel<DadosAgenda>(true, []);


  constructor(private agendaService: AgendaService) {

 
  }

  ngOnInit() {
   this.agendaService.listar()
   .subscribe((resposta: any) => {
    this.dataSource = new MatTableDataSource<DadosAgenda>(resposta.agendas);;
  });
  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DadosAgenda): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.inicio}`;
  }

  cancelarAgendas(){
    console.log(this.selection);
  }
}

