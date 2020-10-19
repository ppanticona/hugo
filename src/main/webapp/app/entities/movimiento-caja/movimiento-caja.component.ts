import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientoCaja } from 'app/shared/model/movimiento-caja.model';
import { MovimientoCajaService } from './movimiento-caja.service';
import { MovimientoCajaDeleteDialogComponent } from './movimiento-caja-delete-dialog.component';

@Component({
  selector: 'jhi-movimiento-caja',
  templateUrl: './movimiento-caja.component.html',
})
export class MovimientoCajaComponent implements OnInit, OnDestroy {
  movimientoCajas?: IMovimientoCaja[];
  eventSubscriber?: Subscription;

  constructor(
    protected movimientoCajaService: MovimientoCajaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.movimientoCajaService.query().subscribe((res: HttpResponse<IMovimientoCaja[]>) => (this.movimientoCajas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInMovimientoCajas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IMovimientoCaja): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInMovimientoCajas(): void {
    this.eventSubscriber = this.eventManager.subscribe('movimientoCajaListModification', () => this.loadAll());
  }

  delete(movimientoCaja: IMovimientoCaja): void {
    const modalRef = this.modalService.open(MovimientoCajaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.movimientoCaja = movimientoCaja;
  }
}
