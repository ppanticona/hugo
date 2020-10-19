import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HugoSharedModule } from 'app/shared/shared.module';
import { PromocionComponent } from './promocion.component';
import { PromocionDetailComponent } from './promocion-detail.component';
import { PromocionUpdateComponent } from './promocion-update.component';
import { PromocionDeleteDialogComponent } from './promocion-delete-dialog.component';
import { promocionRoute } from './promocion.route';

@NgModule({
  imports: [HugoSharedModule, RouterModule.forChild(promocionRoute)],
  declarations: [PromocionComponent, PromocionDetailComponent, PromocionUpdateComponent, PromocionDeleteDialogComponent],
  entryComponents: [PromocionDeleteDialogComponent],
})
export class HugoPromocionModule {}
