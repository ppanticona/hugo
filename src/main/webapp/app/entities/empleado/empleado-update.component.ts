import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IEmpleado, Empleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from './empleado.service';

@Component({
  selector: 'jhi-empleado-update',
  templateUrl: './empleado-update.component.html',
})
export class EmpleadoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipDocEmp: [null, [Validators.required]],
    nroDocEmp: [null, [Validators.required]],
    nombresEmp: [null, [Validators.required]],
    apellidosEmp: [null, [Validators.required]],
    categoria: [],
    tel1: [],
    tel2: [],
    correo: [],
    direccion: [],
    refDirecc: [],
    distrito: [],
    fecIngreso: [],
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

  constructor(protected empleadoService: EmpleadoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empleado }) => {
      if (!empleado.id) {
        const today = moment().startOf('day');
        empleado.fecIngreso = today;
        empleado.fecCrea = today;
        empleado.fecModif = today;
      }

      this.updateForm(empleado);
    });
  }

  updateForm(empleado: IEmpleado): void {
    this.editForm.patchValue({
      id: empleado.id,
      tipDocEmp: empleado.tipDocEmp,
      nroDocEmp: empleado.nroDocEmp,
      nombresEmp: empleado.nombresEmp,
      apellidosEmp: empleado.apellidosEmp,
      categoria: empleado.categoria,
      tel1: empleado.tel1,
      tel2: empleado.tel2,
      correo: empleado.correo,
      direccion: empleado.direccion,
      refDirecc: empleado.refDirecc,
      distrito: empleado.distrito,
      fecIngreso: empleado.fecIngreso ? empleado.fecIngreso.format(DATE_TIME_FORMAT) : null,
      estado: empleado.estado,
      version: empleado.version,
      indDel: empleado.indDel,
      fecCrea: empleado.fecCrea ? empleado.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: empleado.usuCrea,
      ipCrea: empleado.ipCrea,
      fecModif: empleado.fecModif ? empleado.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: empleado.usuModif,
      ipModif: empleado.ipModif,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const empleado = this.createFromForm();
    if (empleado.id !== undefined) {
      this.subscribeToSaveResponse(this.empleadoService.update(empleado));
    } else {
      this.subscribeToSaveResponse(this.empleadoService.create(empleado));
    }
  }

  private createFromForm(): IEmpleado {
    return {
      ...new Empleado(),
      id: this.editForm.get(['id'])!.value,
      tipDocEmp: this.editForm.get(['tipDocEmp'])!.value,
      nroDocEmp: this.editForm.get(['nroDocEmp'])!.value,
      nombresEmp: this.editForm.get(['nombresEmp'])!.value,
      apellidosEmp: this.editForm.get(['apellidosEmp'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
      tel1: this.editForm.get(['tel1'])!.value,
      tel2: this.editForm.get(['tel2'])!.value,
      correo: this.editForm.get(['correo'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      refDirecc: this.editForm.get(['refDirecc'])!.value,
      distrito: this.editForm.get(['distrito'])!.value,
      fecIngreso: this.editForm.get(['fecIngreso'])!.value ? moment(this.editForm.get(['fecIngreso'])!.value, DATE_TIME_FORMAT) : undefined,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>): void {
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
