import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICaja, Caja } from 'app/shared/model/caja.model';
import { CajaService } from './caja.service';

@Component({
  selector: 'jhi-caja-update',
  templateUrl: './caja-update.component.html',
})
export class CajaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipCaja: [null, [Validators.required]],
    descripcion: [null, [Validators.required]],
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

  constructor(protected cajaService: CajaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ caja }) => {
      if (!caja.id) {
        const today = moment().startOf('day');
        caja.fecCrea = today;
        caja.fecModif = today;
      }

      this.updateForm(caja);
    });
  }

  updateForm(caja: ICaja): void {
    this.editForm.patchValue({
      id: caja.id,
      tipCaja: caja.tipCaja,
      descripcion: caja.descripcion,
      estado: caja.estado,
      version: caja.version,
      indDel: caja.indDel,
      fecCrea: caja.fecCrea ? caja.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: caja.usuCrea,
      ipCrea: caja.ipCrea,
      fecModif: caja.fecModif ? caja.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: caja.usuModif,
      ipModif: caja.ipModif,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const caja = this.createFromForm();
    if (caja.id !== undefined) {
      this.subscribeToSaveResponse(this.cajaService.update(caja));
    } else {
      this.subscribeToSaveResponse(this.cajaService.create(caja));
    }
  }

  private createFromForm(): ICaja {
    return {
      ...new Caja(),
      id: this.editForm.get(['id'])!.value,
      tipCaja: this.editForm.get(['tipCaja'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICaja>>): void {
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
