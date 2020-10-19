import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HugoSharedModule } from 'app/shared/shared.module';
import { AutorizacionComponent } from './autorizacion.component';
import { AutorizacionDetailComponent } from './autorizacion-detail.component';
import { AutorizacionUpdateComponent } from './autorizacion-update.component';
import { AutorizacionDeleteDialogComponent } from './autorizacion-delete-dialog.component';
import { autorizacionRoute } from './autorizacion.route';

@NgModule({
  imports: [HugoSharedModule, RouterModule.forChild(autorizacionRoute)],
  declarations: [AutorizacionComponent, AutorizacionDetailComponent, AutorizacionUpdateComponent, AutorizacionDeleteDialogComponent],
  entryComponents: [AutorizacionDeleteDialogComponent],
})
export class HugoAutorizacionModule {}
