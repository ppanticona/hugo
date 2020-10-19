import { Moment } from 'moment';

export interface IAutorizacion {
  id?: string;
  tipAutorizacion?: string;
  token?: string;
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

export class Autorizacion implements IAutorizacion {
  constructor(
    public id?: string,
    public tipAutorizacion?: string,
    public token?: string,
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
