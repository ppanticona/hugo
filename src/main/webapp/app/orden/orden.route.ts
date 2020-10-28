import { OrdenComponent } from './orden.component';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Authority } from 'app/shared/constants/authority.constants';
import { Routes } from '@angular/router';
import { SalidaOrdenComponent } from 'app/orden/salidaOrden.component';

export const ORDEN_ROUTE: Routes = [
  {
    path: 'ingresoPrendas',
    component: OrdenComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Nueva Orden',
    },
  },
  {
    path: 'salidaPrendas',
    component: SalidaOrdenComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Salida de Prenda',
    },
    canActivate: [UserRouteAccessService],
  },
];
