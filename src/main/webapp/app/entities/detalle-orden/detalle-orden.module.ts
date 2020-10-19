import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HugoSharedModule } from 'app/shared/shared.module';
import { DetalleOrdenComponent } from './detalle-orden.component';
import { DetalleOrdenDetailComponent } from './detalle-orden-detail.component';
import { DetalleOrdenUpdateComponent } from './detalle-orden-update.component';
import { DetalleOrdenDeleteDialogComponent } from './detalle-orden-delete-dialog.component';
import { detalleOrdenRoute } from './detalle-orden.route';

@NgModule({
  imports: [HugoSharedModule, RouterModule.forChild(detalleOrdenRoute)],
  declarations: [DetalleOrdenComponent, DetalleOrdenDetailComponent, DetalleOrdenUpdateComponent, DetalleOrdenDeleteDialogComponent],
  entryComponents: [DetalleOrdenDeleteDialogComponent],
})
export class HugoDetalleOrdenModule {}
