import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAutorizacion } from 'app/shared/model/autorizacion.model';

type EntityResponseType = HttpResponse<IAutorizacion>;
type EntityArrayResponseType = HttpResponse<IAutorizacion[]>;

@Injectable({ providedIn: 'root' })
export class AutorizacionService {
  public resourceUrl = SERVER_API_URL + 'api/autorizacions';

  constructor(protected http: HttpClient) {}

  create(autorizacion: IAutorizacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(autorizacion);
    return this.http
      .post<IAutorizacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(autorizacion: IAutorizacion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(autorizacion);
    return this.http
      .put<IAutorizacion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IAutorizacion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAutorizacion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(autorizacion: IAutorizacion): IAutorizacion {
    const copy: IAutorizacion = Object.assign({}, autorizacion, {
      fecIniVig: autorizacion.fecIniVig && autorizacion.fecIniVig.isValid() ? autorizacion.fecIniVig.toJSON() : undefined,
      fecFinVig: autorizacion.fecFinVig && autorizacion.fecFinVig.isValid() ? autorizacion.fecFinVig.toJSON() : undefined,
      fecCrea: autorizacion.fecCrea && autorizacion.fecCrea.isValid() ? autorizacion.fecCrea.toJSON() : undefined,
      fecModif: autorizacion.fecModif && autorizacion.fecModif.isValid() ? autorizacion.fecModif.toJSON() : undefined,
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
      res.body.forEach((autorizacion: IAutorizacion) => {
        autorizacion.fecIniVig = autorizacion.fecIniVig ? moment(autorizacion.fecIniVig) : undefined;
        autorizacion.fecFinVig = autorizacion.fecFinVig ? moment(autorizacion.fecFinVig) : undefined;
        autorizacion.fecCrea = autorizacion.fecCrea ? moment(autorizacion.fecCrea) : undefined;
        autorizacion.fecModif = autorizacion.fecModif ? moment(autorizacion.fecModif) : undefined;
      });
    }
    return res;
  }
}
