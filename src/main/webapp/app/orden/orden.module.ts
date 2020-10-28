import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ORDEN_ROUTE } from './orden.route';
import { OrdenComponent } from './orden.component';
import { SalidaOrdenComponent } from './salidaOrden.component';
import { OrdenDetailComponent } from './orden-detail.component';
import { OrdenDetaileditComponent } from './orden-detailedit.component';
import { PrendasPendientesDialogComponent } from './prendasPendientes-dialog.component';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [RouterModule.forChild(ORDEN_ROUTE), CommonModule],
  declarations: [PrendasPendientesDialogComponent, OrdenDetaileditComponent, OrdenComponent, SalidaOrdenComponent, OrdenDetailComponent],
})
export class HugoOrdenModule {}
