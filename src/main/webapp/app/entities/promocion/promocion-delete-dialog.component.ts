import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPromocion } from 'app/shared/model/promocion.model';
import { PromocionService } from './promocion.service';

@Component({
  templateUrl: './promocion-delete-dialog.component.html',
})
export class PromocionDeleteDialogComponent {
  promocion?: IPromocion;

  constructor(protected promocionService: PromocionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.promocionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('promocionListModification');
      this.activeModal.close();
    });
  }
}
