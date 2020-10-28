import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  templateUrl: './prendasPendientes-dialog.component.html',
})
export class PrendasPendientesDialogComponent {
  constructor(public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}
}
