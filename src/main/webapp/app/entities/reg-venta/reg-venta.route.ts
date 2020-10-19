import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRegVenta, RegVenta } from 'app/shared/model/reg-venta.model';
import { RegVentaService } from './reg-venta.service';
import { RegVentaComponent } from './reg-venta.component';
import { RegVentaDetailComponent } from './reg-venta-detail.component';
import { RegVentaUpdateComponent } from './reg-venta-update.component';

@Injectable({ providedIn: 'root' })
export class RegVentaResolve implements Resolve<IRegVenta> {
  constructor(private service: RegVentaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegVenta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((regVenta: HttpResponse<RegVenta>) => {
          if (regVenta.body) {
            return of(regVenta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RegVenta());
  }
}

export const regVentaRoute: Routes = [
  {
    path: '',
    component: RegVentaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RegVentas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegVentaDetailComponent,
    resolve: {
      regVenta: RegVentaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RegVentas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegVentaUpdateComponent,
    resolve: {
      regVenta: RegVentaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RegVentas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegVentaUpdateComponent,
    resolve: {
      regVenta: RegVentaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RegVentas',
    },
    canActivate: [UserRouteAccessService],
  },
];
