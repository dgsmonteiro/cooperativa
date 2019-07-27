import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAdicionarServico } from './modalAdicionarServico.component';
import {
  MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatFormField, MatDialogModule, MatFormFieldModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    RouterModule
  ],
  declarations: [ModalAdicionarServico],
  exports: [ModalAdicionarServico]
})
export class ModalAdicionarServicoModule { }
