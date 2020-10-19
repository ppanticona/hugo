import { Moment } from 'moment';

export interface ICliente {
  id?: string;
  tipDocCli?: string;
  nroDocCli?: string;
  nombresCli?: string;
  apellidosCli?: string;
  tel1?: string;
  tel2?: string;
  correo?: string;
  direccion?: string;
  refDireccion?: string;
  distrito?: string;
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

export class Cliente implements ICliente {
  constructor(
    public id?: string,
    public tipDocCli?: string,
    public nroDocCli?: string,
    public nombresCli?: string,
    public apellidosCli?: string,
    public tel1?: string,
    public tel2?: string,
    public correo?: string,
    public direccion?: string,
    public refDireccion?: string,
    public distrito?: string,
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
