import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistoricoCaja, HistoricoCaja } from 'app/shared/model/historico-caja.model';
import { HistoricoCajaService } from './historico-caja.service';
import { HistoricoCajaComponent } from './historico-caja.component';
import { HistoricoCajaDetailComponent } from './historico-caja-detail.component';
import { HistoricoCajaUpdateComponent } from './historico-caja-update.component';

@Injectable({ providedIn: 'root' })
export class HistoricoCajaResolve implements Resolve<IHistoricoCaja> {
  constructor(private service: HistoricoCajaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoricoCaja> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historicoCaja: HttpResponse<HistoricoCaja>) => {
          if (historicoCaja.body) {
            return of(historicoCaja.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoricoCaja());
  }
}

export const historicoCajaRoute: Routes = [
  {
    path: '',
    component: HistoricoCajaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HistoricoCajas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HistoricoCajaDetailComponent,
    resolve: {
      historicoCaja: HistoricoCajaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HistoricoCajas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: HistoricoCajaUpdateComponent,
    resolve: {
      historicoCaja: HistoricoCajaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HistoricoCajas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: HistoricoCajaUpdateComponent,
    resolve: {
      historicoCaja: HistoricoCajaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'HistoricoCajas',
    },
    canActivate: [UserRouteAccessService],
  },
];
