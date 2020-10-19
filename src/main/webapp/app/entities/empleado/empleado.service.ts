import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEmpleado } from 'app/shared/model/empleado.model';

type EntityResponseType = HttpResponse<IEmpleado>;
type EntityArrayResponseType = HttpResponse<IEmpleado[]>;

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  public resourceUrl = SERVER_API_URL + 'api/empleados';

  constructor(protected http: HttpClient) {}

  create(empleado: IEmpleado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(empleado);
    return this.http
      .post<IEmpleado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(empleado: IEmpleado): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(empleado);
    return this.http
      .put<IEmpleado>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IEmpleado>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEmpleado[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(empleado: IEmpleado): IEmpleado {
    const copy: IEmpleado = Object.assign({}, empleado, {
      fecIngreso: empleado.fecIngreso && empleado.fecIngreso.isValid() ? empleado.fecIngreso.toJSON() : undefined,
      fecCrea: empleado.fecCrea && empleado.fecCrea.isValid() ? empleado.fecCrea.toJSON() : undefined,
      fecModif: empleado.fecModif && empleado.fecModif.isValid() ? empleado.fecModif.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecIngreso = res.body.fecIngreso ? moment(res.body.fecIngreso) : undefined;
      res.body.fecCrea = res.body.fecCrea ? moment(res.body.fecCrea) : undefined;
      res.body.fecModif = res.body.fecModif ? moment(res.body.fecModif) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((empleado: IEmpleado) => {
        empleado.fecIngreso = empleado.fecIngreso ? moment(empleado.fecIngreso) : undefined;
        empleado.fecCrea = empleado.fecCrea ? moment(empleado.fecCrea) : undefined;
        empleado.fecModif = empleado.fecModif ? moment(empleado.fecModif) : undefined;
      });
    }
    return res;
  }
}
