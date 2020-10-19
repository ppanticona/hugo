import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IOrden, Orden } from 'app/shared/model/orden.model';
import { OrdenService } from './orden.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-orden-update',
  templateUrl: './orden-update.component.html',
})
export class OrdenUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    fecEstiEnt: [null, [Validators.required]],
    fecRecog: [],
    observacion: [],
    estado: [null, [Validators.required]],
    version: [null, [Validators.required]],
    indDel: [null, [Validators.required]],
    fecCrea: [null, [Validators.required]],
    usuCrea: [null, [Validators.required]],
    ipCrea: [null, [Validators.required]],
    fecModif: [],
    usuModif: [],
    ipModif: [],
    cliente: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected ordenService: OrdenService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orden }) => {
      if (!orden.id) {
        const today = moment().startOf('day');
        orden.fecEstiEnt = today;
        orden.fecRecog = today;
        orden.fecCrea = today;
        orden.fecModif = today;
      }

      this.updateForm(orden);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(orden: IOrden): void {
    this.editForm.patchValue({
      id: orden.id,
      fecEstiEnt: orden.fecEstiEnt ? orden.fecEstiEnt.format(DATE_TIME_FORMAT) : null,
      fecRecog: orden.fecRecog ? orden.fecRecog.format(DATE_TIME_FORMAT) : null,
      observacion: orden.observacion,
      estado: orden.estado,
      version: orden.version,
      indDel: orden.indDel,
      fecCrea: orden.fecCrea ? orden.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: orden.usuCrea,
      ipCrea: orden.ipCrea,
      fecModif: orden.fecModif ? orden.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: orden.usuModif,
      ipModif: orden.ipModif,
      cliente: orden.cliente,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('hugoApp.error', { message: err.message })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orden = this.createFromForm();
    if (orden.id !== undefined) {
      this.subscribeToSaveResponse(this.ordenService.update(orden));
    } else {
      this.subscribeToSaveResponse(this.ordenService.create(orden));
    }
  }

  private createFromForm(): IOrden {
    return {
      ...new Orden(),
      id: this.editForm.get(['id'])!.value,
      fecEstiEnt: this.editForm.get(['fecEstiEnt'])!.value ? moment(this.editForm.get(['fecEstiEnt'])!.value, DATE_TIME_FORMAT) : undefined,
      fecRecog: this.editForm.get(['fecRecog'])!.value ? moment(this.editForm.get(['fecRecog'])!.value, DATE_TIME_FORMAT) : undefined,
      observacion: this.editForm.get(['observacion'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      version: this.editForm.get(['version'])!.value,
      indDel: this.editForm.get(['indDel'])!.value,
      fecCrea: this.editForm.get(['fecCrea'])!.value ? moment(this.editForm.get(['fecCrea'])!.value, DATE_TIME_FORMAT) : undefined,
      usuCrea: this.editForm.get(['usuCrea'])!.value,
      ipCrea: this.editForm.get(['ipCrea'])!.value,
      fecModif: this.editForm.get(['fecModif'])!.value ? moment(this.editForm.get(['fecModif'])!.value, DATE_TIME_FORMAT) : undefined,
      usuModif: this.editForm.get(['usuModif'])!.value,
      ipModif: this.editForm.get(['ipModif'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrden>>): void {
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

  trackById(index: number, item: ICliente): any {
    return item.id;
  }
}
