import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html',
})
export class ClienteUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    tipDocCli: [null, [Validators.required]],
    nroDocCli: [null, [Validators.required]],
    nombresCli: [null, [Validators.required]],
    apellidosCli: [null, [Validators.required]],
    tel1: [null, [Validators.required]],
    tel2: [],
    correo: [],
    direccion: [],
    refDireccion: [],
    distrito: [],
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

  constructor(protected clienteService: ClienteService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      if (!cliente.id) {
        const today = moment().startOf('day');
        cliente.fecCrea = today;
        cliente.fecModif = today;
      }

      this.updateForm(cliente);
    });
  }

  updateForm(cliente: ICliente): void {
    this.editForm.patchValue({
      id: cliente.id,
      tipDocCli: cliente.tipDocCli,
      nroDocCli: cliente.nroDocCli,
      nombresCli: cliente.nombresCli,
      apellidosCli: cliente.apellidosCli,
      tel1: cliente.tel1,
      tel2: cliente.tel2,
      correo: cliente.correo,
      direccion: cliente.direccion,
      refDireccion: cliente.refDireccion,
      distrito: cliente.distrito,
      estado: cliente.estado,
      version: cliente.version,
      indDel: cliente.indDel,
      fecCrea: cliente.fecCrea ? cliente.fecCrea.format(DATE_TIME_FORMAT) : null,
      usuCrea: cliente.usuCrea,
      ipCrea: cliente.ipCrea,
      fecModif: cliente.fecModif ? cliente.fecModif.format(DATE_TIME_FORMAT) : null,
      usuModif: cliente.usuModif,
      ipModif: cliente.ipModif,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  private createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id'])!.value,
      tipDocCli: this.editForm.get(['tipDocCli'])!.value,
      nroDocCli: this.editForm.get(['nroDocCli'])!.value,
      nombresCli: this.editForm.get(['nombresCli'])!.value,
      apellidosCli: this.editForm.get(['apellidosCli'])!.value,
      tel1: this.editForm.get(['tel1'])!.value,
      tel2: this.editForm.get(['tel2'])!.value,
      correo: this.editForm.get(['correo'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      refDireccion: this.editForm.get(['refDireccion'])!.value,
      distrito: this.editForm.get(['distrito'])!.value,
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>): void {
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
