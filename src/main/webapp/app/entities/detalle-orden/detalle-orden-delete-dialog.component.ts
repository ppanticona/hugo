import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetalleOrden } from 'app/shared/model/detalle-orden.model';
import { DetalleOrdenService } from './detalle-orden.service';

@Component({
  templateUrl: './detalle-orden-delete-dialog.component.html',
})
export class DetalleOrdenDeleteDialogComponent {
  detalleOrden?: IDetalleOrden;

  constructor(
    protected detalleOrdenService: DetalleOrdenService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.detalleOrdenService.delete(id).subscribe(() => {
      this.eventManager.broadcast('detalleOrdenListModification');
      this.activeModal.close();
    });
  }
}
