import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMovimientoCaja } from 'app/shared/model/movimiento-caja.model';

type EntityResponseType = HttpResponse<IMovimientoCaja>;
type EntityArrayResponseType = HttpResponse<IMovimientoCaja[]>;

@Injectable({ providedIn: 'root' })
export class MovimientoCajaService {
  public resourceUrl = SERVER_API_URL + 'api/movimiento-cajas';

  constructor(protected http: HttpClient) {}

  create(movimientoCaja: IMovimientoCaja): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimientoCaja);
    return this.http
      .post<IMovimientoCaja>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(movimientoCaja: IMovimientoCaja): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(movimientoCaja);
    return this.http
      .put<IMovimientoCaja>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IMovimientoCaja>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMovimientoCaja[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(movimientoCaja: IMovimientoCaja): IMovimientoCaja {
    const copy: IMovimientoCaja = Object.assign({}, movimientoCaja, {
      fecMovimiento:
        movimientoCaja.fecMovimiento && movimientoCaja.fecMovimiento.isValid() ? movimientoCaja.fecMovimiento.toJSON() : undefined,
      fecCrea: movimientoCaja.fecCrea && movimientoCaja.fecCrea.isValid() ? movimientoCaja.fecCrea.toJSON() : undefined,
      fecModif: movimientoCaja.fecModif && movimientoCaja.fecModif.isValid() ? movimientoCaja.fecModif.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecMovimiento = res.body.fecMovimiento ? moment(res.body.fecMovimiento) : undefined;
      res.body.fecCrea = res.body.fecCrea ? moment(res.body.fecCrea) : undefined;
      res.body.fecModif = res.body.fecModif ? moment(res.body.fecModif) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((movimientoCaja: IMovimientoCaja) => {
        movimientoCaja.fecMovimiento = movimientoCaja.fecMovimiento ? moment(movimientoCaja.fecMovimiento) : undefined;
        movimientoCaja.fecCrea = movimientoCaja.fecCrea ? moment(movimientoCaja.fecCrea) : undefined;
        movimientoCaja.fecModif = movimientoCaja.fecModif ? moment(movimientoCaja.fecModif) : undefined;
      });
    }
    return res;
  }
}
