import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetalleOrden } from 'app/shared/model/detalle-orden.model';
import { DetalleOrdenService } from './detalle-orden.service';
import { DetalleOrdenDeleteDialogComponent } from './detalle-orden-delete-dialog.component';

@Component({
  selector: 'jhi-detalle-orden',
  templateUrl: './detalle-orden.component.html',
})
export class DetalleOrdenComponent implements OnInit, OnDestroy {
  detalleOrdens?: IDetalleOrden[];
  eventSubscriber?: Subscription;

  constructor(
    protected detalleOrdenService: DetalleOrdenService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.detalleOrdenService.query().subscribe((res: HttpResponse<IDetalleOrden[]>) => (this.detalleOrdens = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDetalleOrdens();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDetalleOrden): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInDetalleOrdens(): void {
    this.eventSubscriber = this.eventManager.subscribe('detalleOrdenListModification', () => this.loadAll());
  }

  delete(detalleOrden: IDetalleOrden): void {
    const modalRef = this.modalService.open(DetalleOrdenDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.detalleOrden = detalleOrden;
  }
}
