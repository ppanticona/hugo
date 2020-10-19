import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRegVenta } from 'app/shared/model/reg-venta.model';

type EntityResponseType = HttpResponse<IRegVenta>;
type EntityArrayResponseType = HttpResponse<IRegVenta[]>;

@Injectable({ providedIn: 'root' })
export class RegVentaService {
  public resourceUrl = SERVER_API_URL + 'api/reg-ventas';

  constructor(protected http: HttpClient) {}

  create(regVenta: IRegVenta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(regVenta);
    return this.http
      .post<IRegVenta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(regVenta: IRegVenta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(regVenta);
    return this.http
      .put<IRegVenta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IRegVenta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRegVenta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(regVenta: IRegVenta): IRegVenta {
    const copy: IRegVenta = Object.assign({}, regVenta, {
      fecEmiComp: regVenta.fecEmiComp && regVenta.fecEmiComp.isValid() ? regVenta.fecEmiComp.toJSON() : undefined,
      fecVencComp: regVenta.fecVencComp && regVenta.fecVencComp.isValid() ? regVenta.fecVencComp.toJSON() : undefined,
      fecEmiModif: regVenta.fecEmiModif && regVenta.fecEmiModif.isValid() ? regVenta.fecEmiModif.toJSON() : undefined,
      fecCrea: regVenta.fecCrea && regVenta.fecCrea.isValid() ? regVenta.fecCrea.toJSON() : undefined,
      fecModif: regVenta.fecModif && regVenta.fecModif.isValid() ? regVenta.fecModif.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecEmiComp = res.body.fecEmiComp ? moment(res.body.fecEmiComp) : undefined;
      res.body.fecVencComp = res.body.fecVencComp ? moment(res.body.fecVencComp) : undefined;
      res.body.fecEmiModif = res.body.fecEmiModif ? moment(res.body.fecEmiModif) : undefined;
      res.body.fecCrea = res.body.fecCrea ? moment(res.body.fecCrea) : undefined;
      res.body.fecModif = res.body.fecModif ? moment(res.body.fecModif) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((regVenta: IRegVenta) => {
        regVenta.fecEmiComp = regVenta.fecEmiComp ? moment(regVenta.fecEmiComp) : undefined;
        regVenta.fecVencComp = regVenta.fecVencComp ? moment(regVenta.fecVencComp) : undefined;
        regVenta.fecEmiModif = regVenta.fecEmiModif ? moment(regVenta.fecEmiModif) : undefined;
        regVenta.fecCrea = regVenta.fecCrea ? moment(regVenta.fecCrea) : undefined;
        regVenta.fecModif = regVenta.fecModif ? moment(regVenta.fecModif) : undefined;
      });
    }
    return res;
  }
}
