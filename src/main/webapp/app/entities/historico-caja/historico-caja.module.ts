import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HugoSharedModule } from 'app/shared/shared.module';
import { HistoricoCajaComponent } from './historico-caja.component';
import { HistoricoCajaDetailComponent } from './historico-caja-detail.component';
import { HistoricoCajaUpdateComponent } from './historico-caja-update.component';
import { HistoricoCajaDeleteDialogComponent } from './historico-caja-delete-dialog.component';
import { historicoCajaRoute } from './historico-caja.route';

@NgModule({
  imports: [HugoSharedModule, RouterModule.forChild(historicoCajaRoute)],
  declarations: [HistoricoCajaComponent, HistoricoCajaDetailComponent, HistoricoCajaUpdateComponent, HistoricoCajaDeleteDialogComponent],
  entryComponents: [HistoricoCajaDeleteDialogComponent],
})
export class HugoHistoricoCajaModule {}
