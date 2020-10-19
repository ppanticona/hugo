import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IDetalleOrden, DetalleOrden } from 'app/shared/model/detalle-orden.model';
import { DetalleOrdenService } from './detalle-orden.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IOrden } from 'app/shared/model/orden.model';
import { OrdenService } from 'app/entities/orden/orden.service';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';
import { IPromocion } from 'app/shared/model/promocion.model';
import { PromocionService } from 'app/entities/promocion/promocion.service';

type SelectableEntity = IOrden | IProducto | IPromocion;

@Component({
  selector: 'jhi-detalle-orden-update',
  templateUrl: './detalle-orden-update.component.html',
})
export class DetalleOrdenUpdateComponent implements OnInit {
  isSaving = false;
  ordens: IOrden[] = [];
  productos: IProducto[] = [];
  promocions: IPromocion[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required]],
    valUni: [null, [Validators.required]],
    dcto: [null, [Validators.required]],
    subtotal: [null, [Validators.required]],
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
    orden: [],
    producto: [],
    promocion: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected detalleOrdenService: DetalleOrdenService,
    protected ordenService: OrdenService,
    protected productoService: ProductoService,
    protected promocionService: PromocionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detalleOrden }) => {
      if (!detalleOrden.id) {
        const today = moment().startOf('day');
        detalleOrden.fecCrea = today;
        detalleOrden.fecModif = today;
      }

      this.updateForm(detalleOrden);

      this.ordenService.query().subscribe((res: HttpResponse<IOrden[]>) => (this.ordens = res.body || []));

      this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));

      this.promocionService.query().subscribe((res: HttpResponse<IPromocion[]>) => (this.promocions = res.body || []));
    });
  }

  updateForm(detalleOrden: IDetalleOrden): void {
    this.editForm.patchValue({
      id: detalleOrden.id,
      cantidad: detalleOrden.cantidad,
      valUni: detalleOrden.valUni,
      dcto: detalleOrden.dcto,
      subtotal: detalleOrden.subtotal,
      observacion: detalleOrden.observacion,
      estado: detalleOrden.estado,
      version: detalleOrden.version,
      indDel: detalleOrden.indDel,
      fecCrea: detalleOrden.fecCrea ? detalleOrden.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: detalleOrden.usuCrea,
      ipCrea: detalleOrden.ipCrea,
      fecModif: detalleOrden.fecModif ? detalleOrden.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: detalleOrden.usuModif,
      ipModif: detalleOrden.ipModif,
      orden: detalleOrden.orden,
      producto: detalleOrden.producto,
      promocion: detalleOrden.promocion,
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
    const detalleOrden = this.createFromForm();
    if (detalleOrden.id !== undefined) {
      this.subscribeToSaveResponse(this.detalleOrdenService.update(detalleOrden));
    } else {
      this.subscribeToSaveResponse(this.detalleOrdenService.create(detalleOrden));
    }
  }

  private createFromForm(): IDetalleOrden {
    return {
      ...new DetalleOrden(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      valUni: this.editForm.get(['valUni'])!.value,
      dcto: this.editForm.get(['dcto'])!.value,
      subtotal: this.editForm.get(['subtotal'])!.value,
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
      orden: this.editForm.get(['orden'])!.value,
      producto: this.editForm.get(['producto'])!.value,
      promocion: this.editForm.get(['promocion'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleOrden>>): void {
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
