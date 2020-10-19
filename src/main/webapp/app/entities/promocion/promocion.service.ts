import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPromocion } from 'app/shared/model/promocion.model';

type EntityResponseType = HttpResponse<IPromocion>;
type EntityArrayResponseType = HttpResponse<IPromocion[]>;

@Injectable({ providedIn: 'root' })
export class PromocionService {
  public resourceUrl = SERVER_API_URL + 'api/promocions';

  constructor(protected http: HttpClient) {}

  create(promocion: IPromocion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(promocion);
    return this.http
      .post<IPromocion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(promocion: IPromocion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(promocion);
    return this.http
      .put<IPromocion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IPromocion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPromocion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(promocion: IPromocion): IPromocion {
    const copy: IPromocion = Object.assign({}, promocion, {
      fecIniVig: promocion.fecIniVig && promocion.fecIniVig.isValid() ? promocion.fecIniVig.toJSON() : undefined,
      fecFinVig: promocion.fecFinVig && promocion.fecFinVig.isValid() ? promocion.fecFinVig.toJSON() : undefined,
      fecCrea: promocion.fecCrea && promocion.fecCrea.isValid() ? promocion.fecCrea.toJSON() : undefined,
      fecModif: promocion.fecModif && promocion.fecModif.isValid() ? promocion.fecModif.toJSON() : undefined,
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
      res.body.forEach((promocion: IPromocion) => {
        promocion.fecIniVig = promocion.fecIniVig ? moment(promocion.fecIniVig) : undefined;
        promocion.fecFinVig = promocion.fecFinVig ? moment(promocion.fecFinVig) : undefined;
        promocion.fecCrea = promocion.fecCrea ? moment(promocion.fecCrea) : undefined;
        promocion.fecModif = promocion.fecModif ? moment(promocion.fecModif) : undefined;
      });
    }
    return res;
  }
}
