import { Moment } from 'moment';
import { IOrden } from 'app/shared/model/orden.model';

export interface IRegVenta {
  id?: string;
  periodo?: string;
  mes?: string;
  asientContab?: string;
  fecEmiComp?: Moment;
  fecVencComp?: Moment;
  tipComp?: string;
  nroSerieComp?: string;
  nroComp?: string;
  consoDia?: string;
  tipDocCli?: string;
  nroDocCli?: string;
  apeRazSocCli?: string;
  valFacExpor?: number;
  baseImpOperGrav?: number;
  dsctoBaseImp?: number;
  igvIpm?: number;
  dsctoIgvIpm?: number;
  impOpeExo?: number;
  impTotOpeInafec?: number;
  impSecCons?: number;
  baseImpArroz?: number;
  impVentArroz?: number;
  otrosNoBaseImp?: number;
  importeTotalComp?: number;
  codMoneda?: string;
  tipCambio?: number;
  fecEmiModif?: Moment;
  tipCompModif?: string;
  nroSerieCompModif?: string;
  nroCompModif?: string;
  identContrato?: string;
  errTipUno?: string;
  indCompVancMp?: string;
  estadoOperaCancMp?: string;
  campoLibre?: string;
  indDel?: boolean;
  fecCrea?: Moment;
  usuCrea?: string;
  ipCrea?: string;
  fecModif?: Moment;
  usuModif?: string;
  ipModif?: string;
  servidor?: IOrden;
}

export class RegVenta implements IRegVenta {
  constructor(
    public id?: string,
    public periodo?: string,
    public mes?: string,
    public asientContab?: string,
    public fecEmiComp?: Moment,
    public fecVencComp?: Moment,
    public tipComp?: string,
    public nroSerieComp?: string,
    public nroComp?: string,
    public consoDia?: string,
    public tipDocCli?: string,
    public nroDocCli?: string,
    public apeRazSocCli?: string,
    public valFacExpor?: number,
    public baseImpOperGrav?: number,
    public dsctoBaseImp?: number,
    public igvIpm?: number,
    public dsctoIgvIpm?: number,
    public impOpeExo?: number,
    public impTotOpeInafec?: number,
    public impSecCons?: number,
    public baseImpArroz?: number,
    public impVentArroz?: number,
    public otrosNoBaseImp?: number,
    public importeTotalComp?: number,
    public codMoneda?: string,
    public tipCambio?: number,
    public fecEmiModif?: Moment,
    public tipCompModif?: string,
    public nroSerieCompModif?: string,
    public nroCompModif?: string,
    public identContrato?: string,
    public errTipUno?: string,
    public indCompVancMp?: string,
    public estadoOperaCancMp?: string,
    public campoLibre?: string,
    public indDel?: boolean,
    public fecCrea?: Moment,
    public usuCrea?: string,
    public ipCrea?: string,
    public fecModif?: Moment,
    public usuModif?: string,
    public ipModif?: string,
    public servidor?: IOrden
  ) {
    this.indDel = this.indDel || false;
  }
}
