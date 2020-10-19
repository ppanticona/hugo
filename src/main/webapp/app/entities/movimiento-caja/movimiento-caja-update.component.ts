import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IMovimientoCaja, MovimientoCaja } from 'app/shared/model/movimiento-caja.model';
import { MovimientoCajaService } from './movimiento-caja.service';
import { ICaja } from 'app/shared/model/caja.model';
import { CajaService } from 'app/entities/caja/caja.service';
import { IAutorizacion } from 'app/shared/model/autorizacion.model';
import { AutorizacionService } from 'app/entities/autorizacion/autorizacion.service';

type SelectableEntity = ICaja | IAutorizacion;

@Component({
  selector: 'jhi-movimiento-caja-update',
  templateUrl: './movimiento-caja-update.component.html',
})
export class MovimientoCajaUpdateComponent implements OnInit {
  isSaving = false;
  cajas: ICaja[] = [];
  autorizacions: IAutorizacion[] = [];

  editForm = this.fb.group({
    id: [],
    tipMovimiento: [],
    monto: [],
    fecMovimiento: [],
    version: [null, [Validators.required]],
    indDel: [null, [Validators.required]],
    fecCrea: [null, [Validators.required]],
    usuCrea: [null, [Validators.required]],
    ipCrea: [null, [Validators.required]],
    fecModif: [],
    usuModif: [],
    ipModif: [],
    caja: [],
    autorizacion: [],
  });

  constructor(
    protected movimientoCajaService: MovimientoCajaService,
    protected cajaService: CajaService,
    protected autorizacionService: AutorizacionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientoCaja }) => {
      if (!movimientoCaja.id) {
        const today = moment().startOf('day');
        movimientoCaja.fecMovimiento = today;
        movimientoCaja.fecCrea = today;
        movimientoCaja.fecModif = today;
      }

      this.updateForm(movimientoCaja);

      this.cajaService.query().subscribe((res: HttpResponse<ICaja[]>) => (this.cajas = res.body || []));

      this.autorizacionService.query().subscribe((res: HttpResponse<IAutorizacion[]>) => (this.autorizacions = res.body || []));
    });
  }

  updateForm(movimientoCaja: IMovimientoCaja): void {
    this.editForm.patchValue({
      id: movimientoCaja.id,
      tipMovimiento: movimientoCaja.tipMovimiento,
      monto: movimientoCaja.monto,
      fecMovimiento: movimientoCaja.fecMovimiento ? movimientoCaja.fecMovimiento.format(DATE_TIME_FORMAT) : null,
      version: movimientoCaja.version,
      indDel: movimientoCaja.indDel,
      fecCrea: movimientoCaja.fecCrea ? movimientoCaja.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: movimientoCaja.usuCrea,
      ipCrea: movimientoCaja.ipCrea,
      fecModif: movimientoCaja.fecModif ? movimientoCaja.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: movimientoCaja.usuModif,
      ipModif: movimientoCaja.ipModif,
      caja: movimientoCaja.caja,
      autorizacion: movimientoCaja.autorizacion,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimientoCaja = this.createFromForm();
    if (movimientoCaja.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoCajaService.update(movimientoCaja));
    } else {
      this.subscribeToSaveResponse(this.movimientoCajaService.create(movimientoCaja));
    }
  }

  private createFromForm(): IMovimientoCaja {
    return {
      ...new MovimientoCaja(),
      id: this.editForm.get(['id'])!.value,
      tipMovimiento: this.editForm.get(['tipMovimiento'])!.value,
      monto: this.editForm.get(['monto'])!.value,
      fecMovimiento: this.editForm.get(['fecMovimiento'])!.value
        ? moment(this.editForm.get(['fecMovimiento'])!.value, DATE_TIME_FORMAT)
        : undefined,
      version: this.editForm.get(['version'])!.value,
      indDel: this.editForm.get(['indDel'])!.value,
      fecCrea: this.editForm.get(['fecCrea'])!.value ? moment(this.editForm.get(['fecCrea'])!.value, DATE_TIME_FORMAT) : undefined,
      usuCrea: this.editForm.get(['usuCrea'])!.value,
      ipCrea: this.editForm.get(['ipCrea'])!.value,
      fecModif: this.editForm.get(['fecModif'])!.value ? moment(this.editForm.get(['fecModif'])!.value, DATE_TIME_FORMAT) : undefined,
      usuModif: this.editForm.get(['usuModif'])!.value,
      ipModif: this.editForm.get(['ipModif'])!.value,
      caja: this.editForm.get(['caja'])!.value,
      autorizacion: this.editForm.get(['autorizacion'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoCaja>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
