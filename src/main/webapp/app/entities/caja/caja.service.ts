import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICaja } from 'app/shared/model/caja.model';

type EntityResponseType = HttpResponse<ICaja>;
type EntityArrayResponseType = HttpResponse<ICaja[]>;

@Injectable({ providedIn: 'root' })
export class CajaService {
  public resourceUrl = SERVER_API_URL + 'api/cajas';

  constructor(protected http: HttpClient) {}

  create(caja: ICaja): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(caja);
    return this.http
      .post<ICaja>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(caja: ICaja): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(caja);
    return this.http
      .put<ICaja>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<ICaja>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICaja[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(caja: ICaja): ICaja {
    const copy: ICaja = Object.assign({}, caja, {
      fecCrea: caja.fecCrea && caja.fecCrea.isValid() ? caja.fecCrea.toJSON() : undefined,
      fecModif: caja.fecModif && caja.fecModif.isValid() ? caja.fecModif.toJSON() : undefined,
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
      res.body.forEach((caja: ICaja) => {
        caja.fecCrea = caja.fecCrea ? moment(caja.fecCrea) : undefined;
        caja.fecModif = caja.fecModif ? moment(caja.fecModif) : undefined;
      });
    }
    return res;
  }
}
