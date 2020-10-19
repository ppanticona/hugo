import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoricoCaja } from 'app/shared/model/historico-caja.model';
import { HistoricoCajaService } from './historico-caja.service';
import { HistoricoCajaDeleteDialogComponent } from './historico-caja-delete-dialog.component';

@Component({
  selector: 'jhi-historico-caja',
  templateUrl: './historico-caja.component.html',
})
export class HistoricoCajaComponent implements OnInit, OnDestroy {
  historicoCajas?: IHistoricoCaja[];
  eventSubscriber?: Subscription;

  constructor(
    protected historicoCajaService: HistoricoCajaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.historicoCajaService.query().subscribe((res: HttpResponse<IHistoricoCaja[]>) => (this.historicoCajas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistoricoCajas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistoricoCaja): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistoricoCajas(): void {
    this.eventSubscriber = this.eventManager.subscribe('historicoCajaListModification', () => this.loadAll());
  }

  delete(historicoCaja: IHistoricoCaja): void {
    const modalRef = this.modalService.open(HistoricoCajaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.historicoCaja = historicoCaja;
  }
}
