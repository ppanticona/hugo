import { Moment } from 'moment';
import { ICaja } from 'app/shared/model/caja.model';
import { IAutorizacion } from 'app/shared/model/autorizacion.model';

export interface IMovimientoCaja {
  id?: string;
  tipMovimiento?: string;
  monto?: number;
  fecMovimiento?: Moment;
  version?: number;
  indDel?: boolean;
  fecCrea?: Moment;
  usuCrea?: string;
  ipCrea?: string;
  fecModif?: Moment;
  usuModif?: string;
  ipModif?: string;
  caja?: ICaja;
  autorizacion?: IAutorizacion;
}

export class MovimientoCaja implements IMovimientoCaja {
  constructor(
    public id?: string,
    public tipMovimiento?: string,
    public monto?: number,
    public fecMovimiento?: Moment,
    public version?: number,
    public indDel?: boolean,
    public fecCrea?: Moment,
    public usuCrea?: string,
    public ipCrea?: string,
    public fecModif?: Moment,
    public usuModif?: string,
    public ipModif?: string,
    public caja?: ICaja,
    public autorizacion?: IAutorizacion
  ) {
    this.indDel = this.indDel || false;
  }
}
