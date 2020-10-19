import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPromocion, Promocion } from 'app/shared/model/promocion.model';
import { PromocionService } from './promocion.service';
import { PromocionComponent } from './promocion.component';
import { PromocionDetailComponent } from './promocion-detail.component';
import { PromocionUpdateComponent } from './promocion-update.component';

@Injectable({ providedIn: 'root' })
export class PromocionResolve implements Resolve<IPromocion> {
  constructor(private service: PromocionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPromocion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((promocion: HttpResponse<Promocion>) => {
          if (promocion.body) {
            return of(promocion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Promocion());
  }
}

export const promocionRoute: Routes = [
  {
    path: '',
    component: PromocionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Promocions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PromocionDetailComponent,
    resolve: {
      promocion: PromocionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Promocions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PromocionUpdateComponent,
    resolve: {
      promocion: PromocionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Promocions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PromocionUpdateComponent,
    resolve: {
      promocion: PromocionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Promocions',
    },
    canActivate: [UserRouteAccessService],
  },
];
