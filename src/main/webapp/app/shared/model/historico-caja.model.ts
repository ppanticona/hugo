import { Moment } from 'moment';
import { ICaja } from 'app/shared/model/caja.model';
import { IEmpleado } from 'app/shared/model/empleado.model';

export interface IHistoricoCaja {
  id?: string;
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
  caja?: ICaja;
  empleado?: IEmpleado;
}

export class HistoricoCaja implements IHistoricoCaja {
  constructor(
    public id?: string,
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
    public ipModif?: string,
    public caja?: ICaja,
    public empleado?: IEmpleado
  ) {
    this.indDel = this.indDel || false;
  }
}
