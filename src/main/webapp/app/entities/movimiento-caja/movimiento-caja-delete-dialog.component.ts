import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMovimientoCaja } from 'app/shared/model/movimiento-caja.model';
import { MovimientoCajaService } from './movimiento-caja.service';

@Component({
  templateUrl: './movimiento-caja-delete-dialog.component.html',
})
export class MovimientoCajaDeleteDialogComponent {
  movimientoCaja?: IMovimientoCaja;

  constructor(
    protected movimientoCajaService: MovimientoCajaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.movimientoCajaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('movimientoCajaListModification');
      this.activeModal.close();
    });
  }
}
