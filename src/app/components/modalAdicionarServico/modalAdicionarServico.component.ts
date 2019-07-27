import { Component, Inject } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DadosServico {
  name: string;
  descricao: string;
  valor: Number;
}

@Component({
  selector: 'modalServico',
  templateUrl: 'modalAdicionarServico.component.html',
})
export class ModalAdicionarServico {

  constructor(
    public dialogRef: MatDialogRef<ModalAdicionarServico>,
    @Inject(MAT_DIALOG_DATA) public data: DadosServico) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}