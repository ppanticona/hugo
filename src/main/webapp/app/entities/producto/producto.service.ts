import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProducto } from 'app/shared/model/producto.model';

type EntityResponseType = HttpResponse<IProducto>;
type EntityArrayResponseType = HttpResponse<IProducto[]>;

@Injectable({ providedIn: 'root' })
export class ProductoService {
  public resourceUrl = SERVER_API_URL + 'api/productos';

  constructor(protected http: HttpClient) {}

  create(producto: IProducto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(producto);
    return this.http
      .post<IProducto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(producto: IProducto): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(producto);
    return this.http
      .put<IProducto>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IProducto>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProducto[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(producto: IProducto): IProducto {
    const copy: IProducto = Object.assign({}, producto, {
      fecIniVig: producto.fecIniVig && producto.fecIniVig.isValid() ? producto.fecIniVig.toJSON() : undefined,
      fecFinVig: producto.fecFinVig && producto.fecFinVig.isValid() ? producto.fecFinVig.toJSON() : undefined,
      fecCrea: producto.fecCrea && producto.fecCrea.isValid() ? producto.fecCrea.toJSON() : undefined,
      fecModif: producto.fecModif && producto.fecModif.isValid() ? producto.fecModif.toJSON() : undefined,
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
      res.body.forEach((producto: IProducto) => {
        producto.fecIniVig = producto.fecIniVig ? moment(producto.fecIniVig) : undefined;
        producto.fecFinVig = producto.fecFinVig ? moment(producto.fecFinVig) : undefined;
        producto.fecCrea = producto.fecCrea ? moment(producto.fecCrea) : undefined;
        producto.fecModif = producto.fecModif ? moment(producto.fecModif) : undefined;
      });
    }
    return res;
  }
}
