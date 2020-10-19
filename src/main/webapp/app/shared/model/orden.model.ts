import { Moment } from 'moment';
import { IRegVenta } from 'app/shared/model/reg-venta.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface IOrden {
  id?: string;
  fecEstiEnt?: Moment;
  fecRecog?: Moment;
  observacion?: any;
  estado?: string;
  version?: number;
  indDel?: boolean;
  fecCrea?: Moment;
  usuCrea?: string;
  ipCrea?: string;
  fecModif?: Moment;
  usuModif?: string;
  ipModif?: string;
  regVentas?: IRegVenta[];
  cliente?: ICliente;
}

export class Orden implements IOrden {
  constructor(
    public id?: string,
    public fecEstiEnt?: Moment,
    public fecRecog?: Moment,
    public observacion?: any,
    public estado?: string,
    public version?: number,
    public indDel?: boolean,
    public fecCrea?: Moment,
    public usuCrea?: string,
    public ipCrea?: string,
    public fecModif?: Moment,
    public usuModif?: string,
    public ipModif?: string,
    public regVentas?: IRegVenta[],
    public cliente?: ICliente
  ) {
    this.indDel = this.indDel || false;
  }
}
