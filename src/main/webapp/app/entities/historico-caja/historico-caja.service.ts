import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistoricoCaja } from 'app/shared/model/historico-caja.model';

type EntityResponseType = HttpResponse<IHistoricoCaja>;
type EntityArrayResponseType = HttpResponse<IHistoricoCaja[]>;

@Injectable({ providedIn: 'root' })
export class HistoricoCajaService {
  public resourceUrl = SERVER_API_URL + 'api/historico-cajas';

  constructor(protected http: HttpClient) {}

  create(historicoCaja: IHistoricoCaja): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historicoCaja);
    return this.http
      .post<IHistoricoCaja>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(historicoCaja: IHistoricoCaja): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(historicoCaja);
    return this.http
      .put<IHistoricoCaja>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IHistoricoCaja>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistoricoCaja[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(historicoCaja: IHistoricoCaja): IHistoricoCaja {
    const copy: IHistoricoCaja = Object.assign({}, historicoCaja, {
      fecIniVig: historicoCaja.fecIniVig && historicoCaja.fecIniVig.isValid() ? historicoCaja.fecIniVig.toJSON() : undefined,
      fecFinVig: historicoCaja.fecFinVig && historicoCaja.fecFinVig.isValid() ? historicoCaja.fecFinVig.toJSON() : undefined,
      fecCrea: historicoCaja.fecCrea && historicoCaja.fecCrea.isValid() ? historicoCaja.fecCrea.toJSON() : undefined,
      fecModif: historicoCaja.fecModif && historicoCaja.fecModif.isValid() ? historicoCaja.fecModif.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecIniVig = res.body.fecIniVig ? moment(res.body.fecIniVig) : undefined;
      res.body.fecFinVig = res.body.fecFinVig ? moment(res.body.fecFinVig) : undefined;
      res.body.fecCrea = res.body.fecCrea ? moment(res.body.fecCrea) : undefined;
      res.body.fecModif = res.body.fecModif ? moment(res.body.fecModif) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((historicoCaja: IHistoricoCaja) => {
        historicoCaja.fecIniVig = historicoCaja.fecIniVig ? moment(historicoCaja.fecIniVig) : undefined;
        historicoCaja.fecFinVig = historicoCaja.fecFinVig ? moment(historicoCaja.fecFinVig) : undefined;
        historicoCaja.fecCrea = historicoCaja.fecCrea ? moment(historicoCaja.fecCrea) : undefined;
        historicoCaja.fecModif = historicoCaja.fecModif ? moment(historicoCaja.fecModif) : undefined;
      });
    }
    return res;
  }
}
