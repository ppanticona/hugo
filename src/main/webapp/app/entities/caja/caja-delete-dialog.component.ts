import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICaja } from 'app/shared/model/caja.model';
import { CajaService } from './caja.service';

@Component({
  templateUrl: './caja-delete-dialog.component.html',
})
export class CajaDeleteDialogComponent {
  caja?: ICaja;

  constructor(protected cajaService: CajaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.cajaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cajaListModification');
      this.activeModal.close();
    });
  }
}
