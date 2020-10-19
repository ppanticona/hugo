import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICaja } from 'app/shared/model/caja.model';
import { CajaService } from './caja.service';
import { CajaDeleteDialogComponent } from './caja-delete-dialog.component';

@Component({
  selector: 'jhi-caja',
  templateUrl: './caja.component.html',
})
export class CajaComponent implements OnInit, OnDestroy {
  cajas?: ICaja[];
  eventSubscriber?: Subscription;

  constructor(protected cajaService: CajaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cajaService.query().subscribe((res: HttpResponse<ICaja[]>) => (this.cajas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCajas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICaja): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCajas(): void {
    this.eventSubscriber = this.eventManager.subscribe('cajaListModification', () => this.loadAll());
  }

  delete(caja: ICaja): void {
    const modalRef = this.modalService.open(CajaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.caja = caja;
  }
}
