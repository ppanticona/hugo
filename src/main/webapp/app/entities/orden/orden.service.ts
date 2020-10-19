import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOrden } from 'app/shared/model/orden.model';

type EntityResponseType = HttpResponse<IOrden>;
type EntityArrayResponseType = HttpResponse<IOrden[]>;

@Injectable({ providedIn: 'root' })
export class OrdenService {
  public resourceUrl = SERVER_API_URL + 'api/ordens';

  constructor(protected http: HttpClient) {}

  create(orden: IOrden): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orden);
    return this.http
      .post<IOrden>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(orden: IOrden): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(orden);
    return this.http
      .put<IOrden>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IOrden>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrden[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(orden: IOrden): IOrden {
    const copy: IOrden = Object.assign({}, orden, {
      fecEstiEnt: orden.fecEstiEnt && orden.fecEstiEnt.isValid() ? orden.fecEstiEnt.toJSON() : undefined,
      fecRecog: orden.fecRecog && orden.fecRecog.isValid() ? orden.fecRecog.toJSON() : undefined,
      fecCrea: orden.fecCrea && orden.fecCrea.isValid() ? orden.fecCrea.toJSON() : undefined,
      fecModif: orden.fecModif && orden.fecModif.isValid() ? orden.fecModif.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecEstiEnt = res.body.fecEstiEnt ? moment(res.body.fecEstiEnt) : undefined;
      res.body.fecRecog = res.body.fecRecog ? moment(res.body.fecRecog) : undefined;
      res.body.fecCrea = res.body.fecCrea ? moment(res.body.fecCrea) : undefined;
      res.body.fecModif = res.body.fecModif ? moment(res.body.fecModif) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((orden: IOrden) => {
        orden.fecEstiEnt = orden.fecEstiEnt ? moment(orden.fecEstiEnt) : undefined;
        orden.fecRecog = orden.fecRecog ? moment(orden.fecRecog) : undefined;
        orden.fecCrea = orden.fecCrea ? moment(orden.fecCrea) : undefined;
        orden.fecModif = orden.fecModif ? moment(orden.fecModif) : undefined;
      });
    }
    return res;
  }
}
