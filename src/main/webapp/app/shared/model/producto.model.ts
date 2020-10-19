import { Moment } from 'moment';

export interface IProducto {
  id?: string;
  descripcion?: string;
  valor?: number;
  fecIniVig?: Moment;
  fecFinVig?: Moment;
  estado?: string;
  version?: number;
  indDel?: boolean;
  fecCrea?: Moment;
  usuCrea?: string;
  ipCrea?: string;
  fecModif?: Moment;
  usuModif?: string;
  ipModif?: string;
}

export class Producto implements IProducto {
  constructor(
    public id?: string,
    public descripcion?: string,
    public valor?: number,
    public fecIniVig?: Moment,
    public fecFinVig?: Moment,
    public estado?: string,
    public version?: number,
    public indDel?: boolean,
    public fecCrea?: Moment,
    public usuCrea?: string,
    public ipCrea?: string,
    public fecModif?: Moment,
    public usuModif?: string,
    public ipModif?: string
  ) {
    this.indDel = this.indDel || false;
  }
}
