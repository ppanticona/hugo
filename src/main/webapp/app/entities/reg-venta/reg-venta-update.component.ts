import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRegVenta, RegVenta } from 'app/shared/model/reg-venta.model';
import { RegVentaService } from './reg-venta.service';
import { IOrden } from 'app/shared/model/orden.model';
import { OrdenService } from 'app/entities/orden/orden.service';

@Component({
  selector: 'jhi-reg-venta-update',
  templateUrl: './reg-venta-update.component.html',
})
export class RegVentaUpdateComponent implements OnInit {
  isSaving = false;
  ordens: IOrden[] = [];

  editForm = this.fb.group({
    id: [],
    periodo: [null, [Validators.required]],
    mes: [null, [Validators.required]],
    asientContab: [],
    fecEmiComp: [null, [Validators.required]],
    fecVencComp: [null, [Validators.required]],
    tipComp: [null, [Validators.required]],
    nroSerieComp: [null, [Validators.required]],
    nroComp: [null, [Validators.required]],
    consoDia: [],
    tipDocCli: [null, [Validators.required]],
    nroDocCli: [null, [Validators.required]],
    apeRazSocCli: [null, [Validators.required]],
    valFacExpor: [],
    baseImpOperGrav: [null, [Validators.required]],
    dsctoBaseImp: [null, [Validators.required]],
    igvIpm: [null, [Validators.required]],
    dsctoIgvIpm: [null, [Validators.required]],
    impOpeExo: [null, [Validators.required]],
    impTotOpeInafec: [null, [Validators.required]],
    impSecCons: [],
    baseImpArroz: [],
    impVentArroz: [],
    otrosNoBaseImp: [],
    importeTotalComp: [null, [Validators.required]],
    codMoneda: [null, [Validators.required]],
    tipCambio: [null, [Validators.required]],
    fecEmiModif: [],
    tipCompModif: [],
    nroSerieCompModif: [],
    nroCompModif: [],
    identContrato: [],
    errTipUno: [],
    indCompVancMp: [],
    estadoOperaCancMp: [],
    campoLibre: [],
    indDel: [null, [Validators.required]],
    fecCrea: [null, [Validators.required]],
    usuCrea: [null, [Validators.required]],
    ipCrea: [null, [Validators.required]],
    fecModif: [],
    usuModif: [],
    ipModif: [],
    servidor: [],
  });

  constructor(
    protected regVentaService: RegVentaService,
    protected ordenService: OrdenService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ regVenta }) => {
      if (!regVenta.id) {
        const today = moment().startOf('day');
        regVenta.fecEmiComp = today;
        regVenta.fecVencComp = today;
        regVenta.fecEmiModif = today;
        regVenta.fecCrea = today;
        regVenta.fecModif = today;
      }

      this.updateForm(regVenta);

      this.ordenService.query().subscribe((res: HttpResponse<IOrden[]>) => (this.ordens = res.body || []));
    });
  }

  updateForm(regVenta: IRegVenta): void {
    this.editForm.patchValue({
      id: regVenta.id,
      periodo: regVenta.periodo,
      mes: regVenta.mes,
      asientContab: regVenta.asientContab,
      fecEmiComp: regVenta.fecEmiComp ? regVenta.fecEmiComp.format(DATE_TIME_FORMAT) : null,
      fecVencComp: regVenta.fecVencComp ? regVenta.fecVencComp.format(DATE_TIME_FORMAT) : null,
      tipComp: regVenta.tipComp,
      nroSerieComp: regVenta.nroSerieComp,
      nroComp: regVenta.nroComp,
      consoDia: regVenta.consoDia,
      tipDocCli: regVenta.tipDocCli,
      nroDocCli: regVenta.nroDocCli,
      apeRazSocCli: regVenta.apeRazSocCli,
      valFacExpor: regVenta.valFacExpor,
      baseImpOperGrav: regVenta.baseImpOperGrav,
      dsctoBaseImp: regVenta.dsctoBaseImp,
      igvIpm: regVenta.igvIpm,
      dsctoIgvIpm: regVenta.dsctoIgvIpm,
      impOpeExo: regVenta.impOpeExo,
      impTotOpeInafec: regVenta.impTotOpeInafec,
      impSecCons: regVenta.impSecCons,
      baseImpArroz: regVenta.baseImpArroz,
      impVentArroz: regVenta.impVentArroz,
      otrosNoBaseImp: regVenta.otrosNoBaseImp,
      importeTotalComp: regVenta.importeTotalComp,
      codMoneda: regVenta.codMoneda,
      tipCambio: regVenta.tipCambio,
      fecEmiModif: regVenta.fecEmiModif ? regVenta.fecEmiModif.format(DATE_TIME_FORMAT) : null,
      tipCompModif: regVenta.tipCompModif,
      nroSerieCompModif: regVenta.nroSerieCompModif,
      nroCompModif: regVenta.nroCompModif,
      identContrato: regVenta.identContrato,
      errTipUno: regVenta.errTipUno,
      indCompVancMp: regVenta.indCompVancMp,
      estadoOperaCancMp: regVenta.estadoOperaCancMp,
      campoLibre: regVenta.campoLibre,
      indDel: regVenta.indDel,
      fecCrea: regVenta.fecCrea ? regVenta.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: regVenta.usuCrea,
      ipCrea: regVenta.ipCrea,
      fecModif: regVenta.fecModif ? regVenta.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: regVenta.usuModif,
      ipModif: regVenta.ipModif,
      servidor: regVenta.servidor,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const regVenta = this.createFromForm();
    if (regVenta.id !== undefined) {
      this.subscribeToSaveResponse(this.regVentaService.update(regVenta));
    } else {
      this.subscribeToSaveResponse(this.regVentaService.create(regVenta));
    }
  }

  private createFromForm(): IRegVenta {
    return {
      ...new RegVenta(),
      id: this.editForm.get(['id'])!.value,
      periodo: this.editForm.get(['periodo'])!.value,
      mes: this.editForm.get(['mes'])!.value,
      asientContab: this.editForm.get(['asientContab'])!.value,
      fecEmiComp: this.editForm.get(['fecEmiComp'])!.value ? moment(this.editForm.get(['fecEmiComp'])!.value, DATE_TIME_FORMAT) : undefined,
      fecVencComp: this.editForm.get(['fecVencComp'])!.value
        ? moment(this.editForm.get(['fecVencComp'])!.value, DATE_TIME_FORMAT)
        : undefined,
      tipComp: this.editForm.get(['tipComp'])!.value,
      nroSerieComp: this.editForm.get(['nroSerieComp'])!.value,
      nroComp: this.editForm.get(['nroComp'])!.value,
      consoDia: this.editForm.get(['consoDia'])!.value,
      tipDocCli: this.editForm.get(['tipDocCli'])!.value,
      nroDocCli: this.editForm.get(['nroDocCli'])!.value,
      apeRazSocCli: this.editForm.get(['apeRazSocCli'])!.value,
      valFacExpor: this.editForm.get(['valFacExpor'])!.value,
      baseImpOperGrav: this.editForm.get(['baseImpOperGrav'])!.value,
      dsctoBaseImp: this.editForm.get(['dsctoBaseImp'])!.value,
      igvIpm: this.editForm.get(['igvIpm'])!.value,
      dsctoIgvIpm: this.editForm.get(['dsctoIgvIpm'])!.value,
      impOpeExo: this.editForm.get(['impOpeExo'])!.value,
      impTotOpeInafec: this.editForm.get(['impTotOpeInafec'])!.value,
      impSecCons: this.editForm.get(['impSecCons'])!.value,
      baseImpArroz: this.editForm.get(['baseImpArroz'])!.value,
      impVentArroz: this.editForm.get(['impVentArroz'])!.value,
      otrosNoBaseImp: this.editForm.get(['otrosNoBaseImp'])!.value,
      importeTotalComp: this.editForm.get(['importeTotalComp'])!.value,
      codMoneda: this.editForm.get(['codMoneda'])!.value,
      tipCambio: this.editForm.get(['tipCambio'])!.value,
      fecEmiModif: this.editForm.get(['fecEmiModif'])!.value
        ? moment(this.editForm.get(['fecEmiModif'])!.value, DATE_TIME_FORMAT)
        : undefined,
      tipCompModif: this.editForm.get(['tipCompModif'])!.value,
      nroSerieCompModif: this.editForm.get(['nroSerieCompModif'])!.value,
      nroCompModif: this.editForm.get(['nroCompModif'])!.value,
      identContrato: this.editForm.get(['identContrato'])!.value,
      errTipUno: this.editForm.get(['errTipUno'])!.value,
      indCompVancMp: this.editForm.get(['indCompVancMp'])!.value,
      estadoOperaCancMp: this.editForm.get(['estadoOperaCancMp'])!.value,
      campoLibre: this.editForm.get(['campoLibre'])!.value,
      indDel: this.editForm.get(['indDel'])!.value,
      fecCrea: this.editForm.get(['fecCrea'])!.value ? moment(this.editForm.get(['fecCrea'])!.value, DATE_TIME_FORMAT) : undefined,
      usuCrea: this.editForm.get(['usuCrea'])!.value,
      ipCrea: this.editForm.get(['ipCrea'])!.value,
      fecModif: this.editForm.get(['fecModif'])!.value ? moment(this.editForm.get(['fecModif'])!.value, DATE_TIME_FORMAT) : undefined,
      usuModif: this.editForm.get(['usuModif'])!.value,
      ipModif: this.editForm.get(['ipModif'])!.value,
      servidor: this.editForm.get(['servidor'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegVenta>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IOrden): any {
    return item.id;
  }
}
