import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistoricoCaja } from 'app/shared/model/historico-caja.model';
import { HistoricoCajaService } from './historico-caja.service';

@Component({
  templateUrl: './historico-caja-delete-dialog.component.html',
})
export class HistoricoCajaDeleteDialogComponent {
  historicoCaja?: IHistoricoCaja;

  constructor(
    protected historicoCajaService: HistoricoCajaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.historicoCajaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('historicoCajaListModification');
      this.activeModal.close();
    });
  }
}
