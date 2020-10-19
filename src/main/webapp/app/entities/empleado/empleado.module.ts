import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HugoSharedModule } from 'app/shared/shared.module';
import { EmpleadoComponent } from './empleado.component';
import { EmpleadoDetailComponent } from './empleado-detail.component';
import { EmpleadoUpdateComponent } from './empleado-update.component';
import { EmpleadoDeleteDialogComponent } from './empleado-delete-dialog.component';
import { empleadoRoute } from './empleado.route';

@NgModule({
  imports: [HugoSharedModule, RouterModule.forChild(empleadoRoute)],
  declarations: [EmpleadoComponent, EmpleadoDetailComponent, EmpleadoUpdateComponent, EmpleadoDeleteDialogComponent],
  entryComponents: [EmpleadoDeleteDialogComponent],
})
export class HugoEmpleadoModule {}
