import { Moment } from 'moment';
import { IOrden } from 'app/shared/model/orden.model';
import { IProducto } from 'app/shared/model/producto.model';
import { IPromocion } from 'app/shared/model/promocion.model';

export interface IDetalleOrden {
  id?: string;
  cantidad?: number;
  valUni?: number;
  dcto?: number;
  subtotal?: number;
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
  orden?: IOrden;
  producto?: IProducto;
  promocion?: IPromocion;
}

export class DetalleOrden implements IDetalleOrden {
  constructor(
    public id?: string,
    public cantidad?: number,
    public valUni?: number,
    public dcto?: number,
    public subtotal?: number,
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
    public orden?: IOrden,
    public producto?: IProducto,
    public promocion?: IPromocion
  ) {
    this.indDel = this.indDel || false;
  }
}
