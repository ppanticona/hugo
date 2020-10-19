import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICaja, Caja } from 'app/shared/model/caja.model';
import { CajaService } from './caja.service';
import { CajaComponent } from './caja.component';
import { CajaDetailComponent } from './caja-detail.component';
import { CajaUpdateComponent } from './caja-update.component';

@Injectable({ providedIn: 'root' })
export class CajaResolve implements Resolve<ICaja> {
  constructor(private service: CajaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICaja> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((caja: HttpResponse<Caja>) => {
          if (caja.body) {
            return of(caja.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Caja());
  }
}

export const cajaRoute: Routes = [
  {
    path: '',
    component: CajaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cajas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CajaDetailComponent,
    resolve: {
      caja: CajaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cajas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CajaUpdateComponent,
    resolve: {
      caja: CajaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cajas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CajaUpdateComponent,
    resolve: {
      caja: CajaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Cajas',
    },
    canActivate: [UserRouteAccessService],
  },
];
