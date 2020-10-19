import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HugoSharedModule } from 'app/shared/shared.module';
import { MovimientoCajaComponent } from './movimiento-caja.component';
import { MovimientoCajaDetailComponent } from './movimiento-caja-detail.component';
import { MovimientoCajaUpdateComponent } from './movimiento-caja-update.component';
import { MovimientoCajaDeleteDialogComponent } from './movimiento-caja-delete-dialog.component';
import { movimientoCajaRoute } from './movimiento-caja.route';

@NgModule({
  imports: [HugoSharedModule, RouterModule.forChild(movimientoCajaRoute)],
  declarations: [
    MovimientoCajaComponent,
    MovimientoCajaDetailComponent,
    MovimientoCajaUpdateComponent,
    MovimientoCajaDeleteDialogComponent,
  ],
  entryComponents: [MovimientoCajaDeleteDialogComponent],
})
export class HugoMovimientoCajaModule {}
