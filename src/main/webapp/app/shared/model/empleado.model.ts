import { Moment } from 'moment';

export interface IEmpleado {
  id?: string;
  tipDocEmp?: string;
  nroDocEmp?: string;
  nombresEmp?: string;
  apellidosEmp?: string;
  categoria?: string;
  tel1?: string;
  tel2?: string;
  correo?: string;
  direccion?: string;
  refDirecc?: string;
  distrito?: string;
  fecIngreso?: Moment;
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

export class Empleado implements IEmpleado {
  constructor(
    public id?: string,
    public tipDocEmp?: string,
    public nroDocEmp?: string,
    public nombresEmp?: string,
    public apellidosEmp?: string,
    public categoria?: string,
    public tel1?: string,
    public tel2?: string,
    public correo?: string,
    public direccion?: string,
    public refDirecc?: string,
    public distrito?: string,
    public fecIngreso?: Moment,
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
