import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HugoSharedModule } from 'app/shared/shared.module';
import { RegVentaComponent } from './reg-venta.component';
import { RegVentaDetailComponent } from './reg-venta-detail.component';
import { RegVentaUpdateComponent } from './reg-venta-update.component';
import { RegVentaDeleteDialogComponent } from './reg-venta-delete-dialog.component';
import { regVentaRoute } from './reg-venta.route';

@NgModule({
  imports: [HugoSharedModule, RouterModule.forChild(regVentaRoute)],
  declarations: [RegVentaComponent, RegVentaDetailComponent, RegVentaUpdateComponent, RegVentaDeleteDialogComponent],
  entryComponents: [RegVentaDeleteDialogComponent],
})
export class HugoRegVentaModule {}
