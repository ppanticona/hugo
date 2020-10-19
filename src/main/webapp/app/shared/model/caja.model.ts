import { Moment } from 'moment';

export interface ICaja {
  id?: string;
  tipCaja?: string;
  descripcion?: string;
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

export class Caja implements ICaja {
  constructor(
    public id?: string,
    public tipCaja?: string,
    public descripcion?: string,
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
