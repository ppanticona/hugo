import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAutorizacion } from 'app/shared/model/autorizacion.model';
import { AutorizacionService } from './autorizacion.service';

@Component({
  templateUrl: './autorizacion-delete-dialog.component.html',
})
export class AutorizacionDeleteDialogComponent {
  autorizacion?: IAutorizacion;

  constructor(
    protected autorizacionService: AutorizacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.autorizacionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('autorizacionListModification');
      this.activeModal.close();
    });
  }
}
