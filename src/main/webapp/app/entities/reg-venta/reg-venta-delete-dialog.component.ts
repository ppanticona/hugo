import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRegVenta } from 'app/shared/model/reg-venta.model';
import { RegVentaService } from './reg-venta.service';

@Component({
  templateUrl: './reg-venta-delete-dialog.component.html',
})
export class RegVentaDeleteDialogComponent {
  regVenta?: IRegVenta;

  constructor(protected regVentaService: RegVentaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.regVentaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('regVentaListModification');
      this.activeModal.close();
    });
  }
}
