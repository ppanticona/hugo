import { Moment } from 'moment';

export interface IPromocion {
  id?: string;
  tipPromocion?: string;
  val1?: string;
  val2?: string;
  val3?: string;
  maxProm?: string;
  fecIniVig?: Moment;
  fecFinVig?: Moment;
  comentarios?: any;
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

export class Promocion implements IPromocion {
  constructor(
    public id?: string,
    public tipPromocion?: string,
    public val1?: string,
    public val2?: string,
    public val3?: string,
    public maxProm?: string,
    public fecIniVig?: Moment,
    public fecFinVig?: Moment,
    public comentarios?: any,
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
