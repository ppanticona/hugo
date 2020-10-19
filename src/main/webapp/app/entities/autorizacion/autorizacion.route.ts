import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAutorizacion, Autorizacion } from 'app/shared/model/autorizacion.model';
import { AutorizacionService } from './autorizacion.service';
import { AutorizacionComponent } from './autorizacion.component';
import { AutorizacionDetailComponent } from './autorizacion-detail.component';
import { AutorizacionUpdateComponent } from './autorizacion-update.component';

@Injectable({ providedIn: 'root' })
export class AutorizacionResolve implements Resolve<IAutorizacion> {
  constructor(private service: AutorizacionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAutorizacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((autorizacion: HttpResponse<Autorizacion>) => {
          if (autorizacion.body) {
            return of(autorizacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Autorizacion());
  }
}

export const autorizacionRoute: Routes = [
  {
    path: '',
    component: AutorizacionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Autorizacions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AutorizacionDetailComponent,
    resolve: {
      autorizacion: AutorizacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Autorizacions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AutorizacionUpdateComponent,
    resolve: {
      autorizacion: AutorizacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Autorizacions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AutorizacionUpdateComponent,
    resolve: {
      autorizacion: AutorizacionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Autorizacions',
    },
    canActivate: [UserRouteAccessService],
  },
];
