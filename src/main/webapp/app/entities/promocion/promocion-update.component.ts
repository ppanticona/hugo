import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IPromocion, Promocion } from 'app/shared/model/promocion.model';
import { PromocionService } from './promocion.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-promocion-update',
  templateUrl: './promocion-update.component.html',
})
export class PromocionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipPromocion: [null, [Validators.required]],
    val1: [],
    val2: [],
    val3: [],
    maxProm: [],
    fecIniVig: [null, [Validators.required]],
    fecFinVig: [null, [Validators.required]],
    comentarios: [null, [Validators.required]],
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

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected promocionService: PromocionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ promocion }) => {
      if (!promocion.id) {
        const today = moment().startOf('day');
        promocion.fecIniVig = today;
        promocion.fecFinVig = today;
        promocion.fecCrea = today;
        promocion.fecModif = today;
      }

      this.updateForm(promocion);
    });
  }

  updateForm(promocion: IPromocion): void {
    this.editForm.patchValue({
      id: promocion.id,
      tipPromocion: promocion.tipPromocion,
      val1: promocion.val1,
      val2: promocion.val2,
      val3: promocion.val3,
      maxProm: promocion.maxProm,
      fecIniVig: promocion.fecIniVig ? promocion.fecIniVig.format(DATE_TIME_FORMAT) : null,
      fecFinVig: promocion.fecFinVig ? promocion.fecFinVig.format(DATE_TIME_FORMAT) : null,
      comentarios: promocion.comentarios,
      estado: promocion.estado,
      version: promocion.version,
      indDel: promocion.indDel,
      fecCrea: promocion.fecCrea ? promocion.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: promocion.usuCrea,
      ipCrea: promocion.ipCrea,
      fecModif: promocion.fecModif ? promocion.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: promocion.usuModif,
      ipModif: promocion.ipModif,
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
    const promocion = this.createFromForm();
    if (promocion.id !== undefined) {
      this.subscribeToSaveResponse(this.promocionService.update(promocion));
    } else {
      this.subscribeToSaveResponse(this.promocionService.create(promocion));
    }
  }

  private createFromForm(): IPromocion {
    return {
      ...new Promocion(),
      id: this.editForm.get(['id'])!.value,
      tipPromocion: this.editForm.get(['tipPromocion'])!.value,
      val1: this.editForm.get(['val1'])!.value,
      val2: this.editForm.get(['val2'])!.value,
      val3: this.editForm.get(['val3'])!.value,
      maxProm: this.editForm.get(['maxProm'])!.value,
      fecIniVig: this.editForm.get(['fecIniVig'])!.value ? moment(this.editForm.get(['fecIniVig'])!.value, DATE_TIME_FORMAT) : undefined,
      fecFinVig: this.editForm.get(['fecFinVig'])!.value ? moment(this.editForm.get(['fecFinVig'])!.value, DATE_TIME_FORMAT) : undefined,
      comentarios: this.editForm.get(['comentarios'])!.value,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPromocion>>): void {
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
