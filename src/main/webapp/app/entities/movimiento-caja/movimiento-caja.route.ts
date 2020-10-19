import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMovimientoCaja, MovimientoCaja } from 'app/shared/model/movimiento-caja.model';
import { MovimientoCajaService } from './movimiento-caja.service';
import { MovimientoCajaComponent } from './movimiento-caja.component';
import { MovimientoCajaDetailComponent } from './movimiento-caja-detail.component';
import { MovimientoCajaUpdateComponent } from './movimiento-caja-update.component';

@Injectable({ providedIn: 'root' })
export class MovimientoCajaResolve implements Resolve<IMovimientoCaja> {
  constructor(private service: MovimientoCajaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMovimientoCaja> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((movimientoCaja: HttpResponse<MovimientoCaja>) => {
          if (movimientoCaja.body) {
            return of(movimientoCaja.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MovimientoCaja());
  }
}

export const movimientoCajaRoute: Routes = [
  {
    path: '',
    component: MovimientoCajaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MovimientoCajas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MovimientoCajaDetailComponent,
    resolve: {
      movimientoCaja: MovimientoCajaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MovimientoCajas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MovimientoCajaUpdateComponent,
    resolve: {
      movimientoCaja: MovimientoCajaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MovimientoCajas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MovimientoCajaUpdateComponent,
    resolve: {
      movimientoCaja: MovimientoCajaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'MovimientoCajas',
    },
    canActivate: [UserRouteAccessService],
  },
];
