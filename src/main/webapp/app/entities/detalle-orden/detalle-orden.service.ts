import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDetalleOrden } from 'app/shared/model/detalle-orden.model';

type EntityResponseType = HttpResponse<IDetalleOrden>;
type EntityArrayResponseType = HttpResponse<IDetalleOrden[]>;

@Injectable({ providedIn: 'root' })
export class DetalleOrdenService {
  public resourceUrl = SERVER_API_URL + 'api/detalle-ordens';

  constructor(protected http: HttpClient) {}

  create(detalleOrden: IDetalleOrden): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detalleOrden);
    return this.http
      .post<IDetalleOrden>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(detalleOrden: IDetalleOrden): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(detalleOrden);
    return this.http
      .put<IDetalleOrden>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IDetalleOrden>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDetalleOrden[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(detalleOrden: IDetalleOrden): IDetalleOrden {
    const copy: IDetalleOrden = Object.assign({}, detalleOrden, {
      fecCrea: detalleOrden.fecCrea && detalleOrden.fecCrea.isValid() ? detalleOrden.fecCrea.toJSON() : undefined,
      fecModif: detalleOrden.fecModif && detalleOrden.fecModif.isValid() ? detalleOrden.fecModif.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecCrea = res.body.fecCrea ? moment(res.body.fecCrea) : undefined;
      res.body.fecModif = res.body.fecModif ? moment(res.body.fecModif) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((detalleOrden: IDetalleOrden) => {
        detalleOrden.fecCrea = detalleOrden.fecCrea ? moment(detalleOrden.fecCrea) : undefined;
        detalleOrden.fecModif = detalleOrden.fecModif ? moment(detalleOrden.fecModif) : undefined;
      });
    }
    return res;
  }
}
