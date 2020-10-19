import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IProducto, Producto } from 'app/shared/model/producto.model';
import { ProductoService } from './producto.service';

@Component({
  selector: 'jhi-producto-update',
  templateUrl: './producto-update.component.html',
})
export class ProductoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descripcion: [null, [Validators.required]],
    valor: [null, [Validators.required]],
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
  });

  constructor(protected productoService: ProductoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ producto }) => {
      if (!producto.id) {
        const today = moment().startOf('day');
        producto.fecIniVig = today;
        producto.fecFinVig = today;
        producto.fecCrea = today;
        producto.fecModif = today;
      }

      this.updateForm(producto);
    });
  }

  updateForm(producto: IProducto): void {
    this.editForm.patchValue({
      id: producto.id,
      descripcion: producto.descripcion,
      valor: producto.valor,
      fecIniVig: producto.fecIniVig ? producto.fecIniVig.format(DATE_TIME_FORMAT) : null,
      fecFinVig: producto.fecFinVig ? producto.fecFinVig.format(DATE_TIME_FORMAT) : null,
      estado: producto.estado,
      version: producto.version,
      indDel: producto.indDel,
      fecCrea: producto.fecCrea ? producto.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: producto.usuCrea,
      ipCrea: producto.ipCrea,
      fecModif: producto.fecModif ? producto.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: producto.usuModif,
      ipModif: producto.ipModif,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const producto = this.createFromForm();
    if (producto.id !== undefined) {
      this.subscribeToSaveResponse(this.productoService.update(producto));
    } else {
      this.subscribeToSaveResponse(this.productoService.create(producto));
    }
  }

  private createFromForm(): IProducto {
    return {
      ...new Producto(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      valor: this.editForm.get(['valor'])!.value,
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
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProducto>>): void {
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
}
