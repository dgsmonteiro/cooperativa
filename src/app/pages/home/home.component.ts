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
  _id: String;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: UserComponent = new UserComponent();
  displayedColumns: string[] = ['select', 'inicio', 'fim', 'servico', 'valor'];
  dataSource = new MatTableDataSource<DadosAgenda>();
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
    for (let agenda of this.selection.selected) {
      this.agendaService.apagar(agenda._id)
      .subscribe((resposta) => {
        console.log(resposta);
      })
      this.dataSource.data = this.arrayRemove(this.dataSource.data, agenda);
    }
  }
  
  arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
 
 }
}

