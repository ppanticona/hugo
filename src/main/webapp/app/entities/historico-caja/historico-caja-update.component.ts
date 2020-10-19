import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IHistoricoCaja, HistoricoCaja } from 'app/shared/model/historico-caja.model';
import { HistoricoCajaService } from './historico-caja.service';
import { ICaja } from 'app/shared/model/caja.model';
import { CajaService } from 'app/entities/caja/caja.service';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/empleado.service';

type SelectableEntity = ICaja | IEmpleado;

@Component({
  selector: 'jhi-historico-caja-update',
  templateUrl: './historico-caja-update.component.html',
})
export class HistoricoCajaUpdateComponent implements OnInit {
  isSaving = false;
  cajas: ICaja[] = [];
  empleados: IEmpleado[] = [];

  editForm = this.fb.group({
    id: [],
    fecIniVig: [null, [Validators.required]],
    fecFinVig: [null, [Validators.required]],
    estado: [null, [Validators.required]],
    version: [null, [Validators.required]],
    indDel: [null, [Validators.required]],
    fecCrea: [null, [Validators.required]],
    usuCrea: [null, [Validators.required]],
    ipCrea: [null, [Validators.required]],
    fecModif: [],
    usuModif: [],
    ipModif: [],
    caja: [],
    empleado: [],
  });

  constructor(
    protected historicoCajaService: HistoricoCajaService,
    protected cajaService: CajaService,
    protected empleadoService: EmpleadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historicoCaja }) => {
      if (!historicoCaja.id) {
        const today = moment().startOf('day');
        historicoCaja.fecIniVig = today;
        historicoCaja.fecFinVig = today;
        historicoCaja.fecCrea = today;
        historicoCaja.fecModif = today;
      }

      this.updateForm(historicoCaja);

      this.cajaService.query().subscribe((res: HttpResponse<ICaja[]>) => (this.cajas = res.body || []));

      this.empleadoService.query().subscribe((res: HttpResponse<IEmpleado[]>) => (this.empleados = res.body || []));
    });
  }

  updateForm(historicoCaja: IHistoricoCaja): void {
    this.editForm.patchValue({
      id: historicoCaja.id,
      fecIniVig: historicoCaja.fecIniVig ? historicoCaja.fecIniVig.format(DATE_TIME_FORMAT) : null,
      fecFinVig: historicoCaja.fecFinVig ? historicoCaja.fecFinVig.format(DATE_TIME_FORMAT) : null,
      estado: historicoCaja.estado,
      version: historicoCaja.version,
      indDel: historicoCaja.indDel,
      fecCrea: historicoCaja.fecCrea ? historicoCaja.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: historicoCaja.usuCrea,
      ipCrea: historicoCaja.ipCrea,
      fecModif: historicoCaja.fecModif ? historicoCaja.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: historicoCaja.usuModif,
      ipModif: historicoCaja.ipModif,
      caja: historicoCaja.caja,
      empleado: historicoCaja.empleado,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historicoCaja = this.createFromForm();
    if (historicoCaja.id !== undefined) {
      this.subscribeToSaveResponse(this.historicoCajaService.update(historicoCaja));
    } else {
      this.subscribeToSaveResponse(this.historicoCajaService.create(historicoCaja));
    }
  }

  private createFromForm(): IHistoricoCaja {
    return {
      ...new HistoricoCaja(),
      id: this.editForm.get(['id'])!.value,
      fecIniVig: this.editForm.get(['fecIniVig'])!.value ? moment(this.editForm.get(['fecIniVig'])!.value, DATE_TIME_FORMAT) : undefined,
      fecFinVig: this.editForm.get(['fecFinVig'])!.value ? moment(this.editForm.get(['fecFinVig'])!.value, DATE_TIME_FORMAT) : undefined,
      estado: this.editForm.get(['estado'])!.value,
      version: this.editForm.get(['version'])!.value,
      indDel: this.editForm.get(['indDel'])!.value,
      fecCrea: this.editForm.get(['fecCrea'])!.value ? moment(this.editForm.get(['fecCrea'])!.value, DATE_TIME_FORMAT) : undefined,
      usuCrea: this.editForm.get(['usuCrea'])!.value,
      ipCrea: this.editForm.get(['ipCrea'])!.value,
      fecModif: this.editForm.get(['fecModif'])!.value ? moment(this.editForm.get(['fecModif'])!.value, DATE_TIME_FORMAT) : undefined,
      usuModif: this.editForm.get(['usuModif'])!.value,
      ipModif: this.editForm.get(['ipModif'])!.value,
      caja: this.editForm.get(['caja'])!.value,
      empleado: this.editForm.get(['empleado'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistoricoCaja>>): void {
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
