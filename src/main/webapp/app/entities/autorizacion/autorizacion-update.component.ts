import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAutorizacion, Autorizacion } from 'app/shared/model/autorizacion.model';
import { AutorizacionService } from './autorizacion.service';

@Component({
  selector: 'jhi-autorizacion-update',
  templateUrl: './autorizacion-update.component.html',
})
export class AutorizacionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipAutorizacion: [null, [Validators.required]],
    token: [null, [Validators.required]],
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

  constructor(protected autorizacionService: AutorizacionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ autorizacion }) => {
      if (!autorizacion.id) {
        const today = moment().startOf('day');
        autorizacion.fecIniVig = today;
        autorizacion.fecFinVig = today;
        autorizacion.fecCrea = today;
        autorizacion.fecModif = today;
      }

      this.updateForm(autorizacion);
    });
  }

  updateForm(autorizacion: IAutorizacion): void {
    this.editForm.patchValue({
      id: autorizacion.id,
      tipAutorizacion: autorizacion.tipAutorizacion,
      token: autorizacion.token,
      fecIniVig: autorizacion.fecIniVig ? autorizacion.fecIniVig.format(DATE_TIME_FORMAT) : null,
      fecFinVig: autorizacion.fecFinVig ? autorizacion.fecFinVig.format(DATE_TIME_FORMAT) : null,
      estado: autorizacion.estado,
      version: autorizacion.version,
      indDel: autorizacion.indDel,
      fecCrea: autorizacion.fecCrea ? autorizacion.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: autorizacion.usuCrea,
      ipCrea: autorizacion.ipCrea,
      fecModif: autorizacion.fecModif ? autorizacion.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: autorizacion.usuModif,
      ipModif: autorizacion.ipModif,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const autorizacion = this.createFromForm();
    if (autorizacion.id !== undefined) {
      this.subscribeToSaveResponse(this.autorizacionService.update(autorizacion));
    } else {
      this.subscribeToSaveResponse(this.autorizacionService.create(autorizacion));
    }
  }

  private createFromForm(): IAutorizacion {
    return {
      ...new Autorizacion(),
      id: this.editForm.get(['id'])!.value,
      tipAutorizacion: this.editForm.get(['tipAutorizacion'])!.value,
      token: this.editForm.get(['token'])!.value,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAutorizacion>>): void {
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
